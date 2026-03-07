document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. Three.js Background Logic ----
    const initThreeJS = () => {
        const container = document.getElementById('canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        // subtle fog to blend objects into the background
        scene.fog = new THREE.FogExp2(0x060910, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x4A90E2, 1);
        directionalLight.position.set(10, 20, 10);
        scene.add(directionalLight);

        const accentLight = new THREE.PointLight(0xcd8560, 2, 50);
        accentLight.position.set(-10, -10, 10);
        scene.add(accentLight);

        // Materials (Glassy / Brutalist feel)
        const geometries = [
            new THREE.BoxGeometry(4, 4, 4),
            new THREE.TetrahedronGeometry(4),
            new THREE.OctahedronGeometry(3),
            new THREE.IcosahedronGeometry(3)
        ];

        const material1 = new THREE.MeshPhysicalMaterial({
            color: 0x1a2235,
            metalness: 0.9,
            roughness: 0.2,
            envMapIntensity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });

        const material2 = new THREE.MeshPhysicalMaterial({
            color: 0x3a2920,
            metalness: 0.7,
            roughness: 0.4,
            wireframe: false
        });

        // Create Floating Objects
        const floatingObjects = [];
        for (let i = 0; i < 15; i++) {
            const geo = geometries[Math.floor(Math.random() * geometries.length)];
            const mat = Math.random() > 0.5 ? material1 : material2;
            const mesh = new THREE.Mesh(geo, mat);

            // Random positions
            mesh.position.x = (Math.random() - 0.5) * 60;
            mesh.position.y = (Math.random() - 0.5) * 60;
            mesh.position.z = (Math.random() - 0.5) * 40 - 10; // pushed slightly back

            // Random rotations
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Speed
            mesh.userData = {
                rx: (Math.random() - 0.5) * 0.01,
                ry: (Math.random() - 0.5) * 0.01,
                yDir: (Math.random() - 0.5) * 0.02
            };

            scene.add(mesh);
            floatingObjects.push(mesh);
        }

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            floatingObjects.forEach(obj => {
                obj.rotation.x += obj.userData.rx;
                obj.rotation.y += obj.userData.ry;
                obj.position.y += obj.userData.yDir;

                // Bounce back if they drift too far
                if (obj.position.y > 30 || obj.position.y < -30) {
                    obj.userData.yDir *= -1;
                }
            });

            // Gentle camera pan based on mouse interaction (optional)
            // camera.position.x += (mouseX - camera.position.x) * 0.05;
            // camera.position.y += (-mouseY - camera.position.y) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    initThreeJS();


    // ---- 2. 3D Card Hover Effects ----
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });
});
