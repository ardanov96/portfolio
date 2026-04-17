'use client';
import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf: number;
    const G = '201,168,76';
    const mouse = { x: W * 0.75, y: H * 0.5 };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    // ── HTTP Method badges ──
    const METHODS = [
      { label: 'GET',    color: '80,200,120'  },
      { label: 'POST',   color: '100,160,255' },
      { label: 'PUT',    color: '255,180,50'  },
      { label: 'DELETE', color: '255,90,90'   },
      { label: 'PATCH',  color: '180,120,255' },
    ];

    interface HttpPacket {
      method: typeof METHODS[0];
      endpoint: string;
      x: number; y: number;
      vx: number; vy: number;
      opacity: number; targetOpacity: number;
      scale: number;
    }

    const ENDPOINTS = [
      '/api/users', '/api/auth/login', '/api/products',
      '/api/bookings', '/api/payments', '/api/search',
      '/api/upload', '/api/reviews', '/api/dashboard',
      '/v1/trips', '/v1/agents', '/v1/flash-sale',
    ];

    const packets: HttpPacket[] = Array.from({ length: 12 }, () => ({
      method: METHODS[Math.floor(Math.random() * METHODS.length)],
      endpoint: ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)],
      x: W * 0.4 + Math.random() * W * 0.6,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1,
      opacity: 0,
      targetOpacity: Math.random() * 0.22 + 0.08,
      scale: Math.random() * 0.4 + 0.7,
    }));

    // ── JSON fragments floating ──
    const JSON_SNIPPETS = [
      '{ "status": 200 }',
      '{ "token": "jwt..." }',
      '"id": 1024,',
      '"role": "agent",',
      '"price": 575000,',
      '[ ...items ]',
      '"created_at": "2026-',
      '"is_flash_sale": true',
      '"location": "Bali"',
      '{ "data": [...] }',
    ];

    interface JsonFrag {
      text: string; x: number; y: number;
      opacity: number; targetOpacity: number;
      vy: number; fontSize: number;
    }

    const jsonFrags: JsonFrag[] = JSON_SNIPPETS.map(text => ({
      text,
      x: W * 0.38 + Math.random() * W * 0.62,
      y: Math.random() * H,
      opacity: 0,
      targetOpacity: Math.random() * 0.18 + 0.05,
      vy: (Math.random() - 0.5) * 0.07,
      fontSize: Math.random() * 3 + 9,
    }));

    // ── Code lines (syntax-highlighted fragments) ──
    const CODE_LINES = [
      { text: 'const router = express.Router()',    color: `rgba(${G},0.18)` },
      { text: 'app.use(cors({ origin: "*" }))',      color: `rgba(${G},0.15)` },
      { text: 'await db.query(`SELECT * FROM`)',     color: `rgba(${G},0.16)` },
      { text: 'useState<Product[]>([])',              color: `rgba(${G},0.14)` },
      { text: 'export default function Page()',       color: `rgba(${G},0.17)` },
      { text: 'res.json({ success: true })',          color: `rgba(${G},0.15)` },
      { text: 'prisma.user.findMany()',               color: `rgba(${G},0.13)` },
      { text: 'npm run build && vercel --prod',       color: `rgba(${G},0.16)` },
      { text: 'git push origin main',                 color: `rgba(${G},0.14)` },
      { text: 'SELECT id, name FROM products',        color: `rgba(${G},0.17)` },
    ];

    interface CodeLine {
      text: string; color: string;
      x: number; y: number;
      opacity: number; targetOpacity: number;
      vy: number;
    }

    const codeLines: CodeLine[] = CODE_LINES.map(c => ({
      ...c,
      x: W * 0.36 + Math.random() * W * 0.6,
      y: Math.random() * H,
      opacity: 0,
      targetOpacity: Math.random() * 0.7 + 0.3,
      vy: (Math.random() - 0.5) * 0.06,
    }));

    // ── Request → Server → Response arcs ──
    interface Arc {
      fromX: number; fromY: number;
      toX: number; toY: number;
      progress: number; speed: number;
      opacity: number; color: string;
    }

    const SERVER_X = W * 0.72;
    const SERVER_Y = H * 0.48;

    const arcs: Arc[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const r = 160 + Math.random() * 100;
      return {
        fromX: SERVER_X + Math.cos(angle) * r,
        fromY: SERVER_Y + Math.sin(angle) * r,
        toX: SERVER_X,
        toY: SERVER_Y,
        progress: Math.random(),
        speed: Math.random() * 0.005 + 0.003,
        opacity: Math.random() * 0.3 + 0.1,
        color: METHODS[i % METHODS.length].color,
      };
    });

    // ── Server node (central) ──
    let serverPulse = 0;

    // ── Git branch lines ──
    interface GitNode { x: number; y: number; branch: number }
    const GIT_X = W * 0.88;
    const gitNodes: GitNode[] = [];
    for (let i = 0; i < 8; i++) {
      const branch = i % 3;
      gitNodes.push({ x: GIT_X + (branch - 1) * 18, y: H * 0.15 + i * 52, branch });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Mouse ambient glow
      const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      mg.addColorStop(0, `rgba(${G},0.04)`);
      mg.addColorStop(1, `rgba(${G},0)`);
      ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H);

      // ── Draw request arcs ──
      for (const arc of arcs) {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;

        const t = arc.progress;
        const mx2 = (arc.fromX + arc.toX) / 2;
        const my2 = (arc.fromY + arc.toY) / 2 - 60;

        // Draw arc path dimly
        ctx.beginPath();
        ctx.moveTo(arc.fromX, arc.fromY);
        ctx.quadraticCurveTo(mx2, my2, arc.toX, arc.toY);
        ctx.strokeStyle = `rgba(${arc.color},0.06)`;
        ctx.lineWidth = 0.8; ctx.stroke();

        // Moving pulse dot along arc
        const bx = (1-t)*(1-t)*arc.fromX + 2*(1-t)*t*mx2 + t*t*arc.toX;
        const by = (1-t)*(1-t)*arc.fromY + 2*(1-t)*t*my2 + t*t*arc.toY;

        const pg = ctx.createRadialGradient(bx, by, 0, bx, by, 8);
        pg.addColorStop(0, `rgba(${arc.color},0.9)`);
        pg.addColorStop(1, `rgba(${arc.color},0)`);
        ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI*2);
        ctx.fillStyle = pg; ctx.fill();
        ctx.beginPath(); ctx.arc(bx, by, 2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,0.9)`; ctx.fill();
      }

      // ── Server node ──
      serverPulse += 0.03;
      const sp = Math.sin(serverPulse) * 0.5 + 0.5;

      // Outer rings
      for (let i = 3; i >= 1; i--) {
        ctx.beginPath();
        ctx.arc(SERVER_X, SERVER_Y, 18 + i * 12 + sp * 4, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(${G},${0.04 + (4-i)*0.02})`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      // Core
      const sg = ctx.createRadialGradient(SERVER_X, SERVER_Y, 0, SERVER_X, SERVER_Y, 18);
      sg.addColorStop(0, `rgba(${G},0.6)`);
      sg.addColorStop(0.5, `rgba(${G},0.2)`);
      sg.addColorStop(1, `rgba(${G},0)`);
      ctx.beginPath(); ctx.arc(SERVER_X, SERVER_Y, 18, 0, Math.PI*2);
      ctx.fillStyle = sg; ctx.fill();

      // Server label
      ctx.font = '500 9px JetBrains Mono,monospace';
      ctx.fillStyle = `rgba(${G},0.5)`;
      ctx.textAlign = 'center';
      ctx.fillText('SERVER', SERVER_X, SERVER_Y + 28);
      ctx.fillText('Node.js / Express', SERVER_X, SERVER_Y + 40);

      // ── HTTP Packets ──
      ctx.textAlign = 'left';
      for (const p of packets) {
        p.x += p.vx; p.y += p.vy;
        if (p.x > W + 100) p.x = W * 0.35;
        if (p.x < W * 0.35) p.x = W + 100;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        p.opacity += (p.targetOpacity - p.opacity) * 0.02;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        const boost = dist < 140 ? (1-dist/140)*0.35 : 0;
        const finalAlpha = Math.min(p.opacity + boost, 0.7);

        ctx.save();
        ctx.globalAlpha = finalAlpha;

        // Method badge
        const badgeW = 40 * p.scale;
        const badgeH = 16 * p.scale;
        ctx.fillStyle = `rgba(${p.method.color},0.15)`;
        ctx.strokeStyle = `rgba(${p.method.color},0.5)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, badgeW, badgeH, 3);
        ctx.fill(); ctx.stroke();

        ctx.font = `500 ${9*p.scale}px JetBrains Mono,monospace`;
        ctx.fillStyle = `rgba(${p.method.color},0.9)`;
        ctx.textAlign = 'center';
        ctx.fillText(p.method.label, p.x + badgeW/2, p.y + badgeH/2 + 3*p.scale);

        // Endpoint
        ctx.font = `300 ${8*p.scale}px JetBrains Mono,monospace`;
        ctx.fillStyle = `rgba(${G},0.6)`;
        ctx.textAlign = 'left';
        ctx.fillText(p.endpoint, p.x + badgeW + 6*p.scale, p.y + badgeH/2 + 3*p.scale);

        ctx.restore();
      }

      // ── JSON fragments ──
      for (const f of jsonFrags) {
        f.y += f.vy;
        if (f.y < 0) f.y = H; if (f.y > H) f.y = 0;
        f.opacity += (f.targetOpacity - f.opacity) * 0.015;
        if (Math.abs(f.opacity - f.targetOpacity) < 0.003) {
          f.targetOpacity = Math.random() > 0.4 ? Math.random()*0.18+0.04 : 0;
          if (f.targetOpacity < 0.01) {
            setTimeout(() => {
              f.x = W*0.38 + Math.random()*W*0.58;
              f.targetOpacity = Math.random()*0.18+0.05;
            }, 1500);
          }
        }
        const dx = f.x - mouse.x, dy = f.y - mouse.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        const boost = dist < 150 ? (1-dist/150)*0.25 : 0;

        ctx.font = `300 ${f.fontSize}px JetBrains Mono,monospace`;
        ctx.fillStyle = `rgba(${G},${Math.min(f.opacity+boost, 0.45)})`;
        ctx.textAlign = 'left';
        ctx.fillText(f.text, f.x, f.y);
      }

      // ── Code lines ──
      for (const line of codeLines) {
        line.y += line.vy;
        if (line.y < 0) line.y = H; if (line.y > H) line.y = 0;
        line.opacity += (line.targetOpacity - line.opacity) * 0.01;
        if (Math.abs(line.opacity - line.targetOpacity) < 0.004) {
          line.targetOpacity = Math.random() > 0.35 ? Math.random()*0.55+0.12 : 0;
        }
        const dx = line.x - mouse.x, dy = line.y - mouse.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        const boost = dist < 170 ? (1-dist/170)*0.2 : 0;

        ctx.font = `300 9px JetBrains Mono,monospace`;
        ctx.fillStyle = line.color.replace(')', `,${Math.min(line.opacity+boost,0.5)})`).replace('rgba(', 'rgba(');

        // Simpler: just set global alpha
        ctx.globalAlpha = Math.min(line.opacity + boost, 0.5);
        ctx.fillStyle = `rgba(${G},1)`;
        ctx.textAlign = 'left';
        ctx.fillText(line.text, line.x, line.y);
        ctx.globalAlpha = 1;
      }

      // ── Git graph ──
      ctx.textAlign = 'left';
      const branchColors = ['201,168,76', '100,200,120', '100,150,255'];
      for (let i = 0; i < gitNodes.length - 1; i++) {
        const n = gitNodes[i], n2 = gitNodes[i+1];
        ctx.beginPath();
        ctx.moveTo(n.x, n.y); ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = `rgba(${branchColors[n.branch]},0.2)`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      for (const n of gitNodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${branchColors[n.branch]},0.35)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${branchColors[n.branch]},0.5)`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }
      ctx.font = '300 8px JetBrains Mono,monospace';
      ctx.fillStyle = `rgba(${G},0.2)`;
      ctx.fillText('git log --oneline', GIT_X - 28, H*0.12);

      raf = requestAnimationFrame(draw);
    };

    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }} />
  );
}