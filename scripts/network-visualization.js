document.addEventListener('DOMContentLoaded', function() {
    // Create network visualization
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Nodes for the network visualization
    const nodes = [];
    const connections = [];
    const numNodes = 15;

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 3 + Math.random() * 4,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            type: Math.random() > 0.7 ? 'server' : 'node',
            connections: []
        });
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        // Each node connects to 1-3 other nodes
        const numConnections = 1 + Math.floor(Math.random() * 3);
        for (let j = 0; j < numConnections; j++) {
            let targetIndex;
            do {
                targetIndex = Math.floor(Math.random() * nodes.length);
            } while (targetIndex === i || nodes[i].connections.includes(targetIndex));

            nodes[i].connections.push(targetIndex);
            connections.push({
                from: i,
                to: targetIndex,
                active: false,
                progress: 0,
                speed: 0.002 + Math.random() * 0.003
            });
        }
    }

    // Create random packets
    function createPacket() {
        const packet = document.createElement('div');
        packet.className = 'packet-animation';
        packet.style.left = `${Math.random() * 100}vw`;
        packet.style.top = `${Math.random() * 100}vh`;
        packet.style.animationDuration = `${10 + Math.random() * 10}s`;
        packet.style.animationDelay = `${Math.random() * 5}s`;
        document.querySelector('.network-background').appendChild(packet);

        // Remove after animation completes
        setTimeout(() => {
            packet.remove();
        }, 15000);
    }

    // Create server rack with blinking lights
    function createServerRack() {
        const rack = document.querySelector('.server-rack-animation');
        for (let i = 0; i < 8; i++) {
            const light = document.createElement('div');
            light.className = 'server-light';
            light.style.top = `${20 + i * 22}px`;
            light.style.animationDelay = `${i * 0.3}s`;
            rack.appendChild(light);
        }
    }

    // Animation loop for network visualization
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.2)';
        ctx.lineWidth = 1;

        for (const connection of connections) {
            const fromNode = nodes[connection.from];
            const toNode = nodes[connection.to];

            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();

            // Animate data packets on connections
            if (Math.random() < 0.02) {
                connection.active = true;
                connection.progress = 0;
            }

            if (connection.active) {
                connection.progress += connection.speed;
                if (connection.progress >= 1) {
                    connection.active = false;
                } else {
                    const x = fromNode.x + (toNode.x - fromNode.x) * connection.progress;
                    const y = fromNode.y + (toNode.y - fromNode.y) * connection.progress;

                    ctx.fillStyle = 'rgba(231, 76, 60, 0.8)';
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Draw nodes
        for (const node of nodes) {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off walls
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // Draw node
            if (node.type === 'server') {
                // Server node
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius
                );
                gradient.addColorStop(0, 'rgba(52, 152, 219, 0.8)');
                gradient.addColorStop(1, 'rgba(41, 128, 185, 0.8)');

                ctx.fillStyle = gradient;
            } else {
                // Regular node
                ctx.fillStyle = 'rgba(46, 204, 113, 0.6)';
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(animate);
    }

    // Initialize animations
    animate();

    // Create initial packets
    for (let i = 0; i < 5; i++) {
        createPacket();
    }

    // Continue creating packets periodically
    setInterval(createPacket, 2000);

    // Create server rack
    createServerRack();

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});