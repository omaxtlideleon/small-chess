const t=document.getElementById("chessboard"),e=document.getElementById("status"),n=document.getElementById("promotion-menu");let l,s,r,i,o,c,f,a,u=null,h=!1;const d={1:"wp",2:"wn",3:"wb",4:"wr",5:"wq",6:"wk",9:"bp",10:"bn",11:"bb",12:"br",13:"bq",14:"bk"},p={1:"w",2:"w",3:"w",4:"w",5:"w",6:"w",9:"b",10:"b",11:"b",12:"b",13:"b",14:"b"},b={1:"p",2:"n",3:"b",4:"r",5:"q",6:"k",9:"p",10:"n",11:"b",12:"r",13:"q",14:"k"};function w(t,e){return (t<<3)|e;}function m(t){return[Math.floor(t/8),t%8]}function g(t){return new Uint8Array(t)}function k(){l=function(){const t=new Uint8Array(64);return t.set([12,10,11,13,14,11,10,12],0),t.set(Array(8).fill(9),8),t.set(Array(8).fill(1),48),t.set([4,2,3,5,6,3,2,4],56),t}(),s="w",r=null,i=[],o=null,c={w:{K:!0,Q:!0},b:{K:!0,Q:!0}},f=0,a=1,q(),I()}function q(){t.innerHTML="";for(let e=0;e<8;e++)for(let n=0;n<8;n++){let s=h?7-e:e,i=h?7-n:n;const o=document.createElement("div");if(o.className="square "+((s+i)%2==0?"light":"dark"),o.dataset.row=s,o.dataset.col=i,u){const[t,e]=u;(t[0]===s&&t[1]===i||e[0]===s&&e[1]===i)&&o.classList.add("lastmove")}r&&r[0]===s&&r[1]===i&&o.classList.add("highlight");const c=l[w(s,i)];if(c){const t=document.createElement("img");t.className="piece",t.src=`pieceImages/${d[c]}.png`,t.draggable=!1,o.appendChild(t)}o.addEventListener("click",v),t.appendChild(o)}!function(){for(let e=0;e<64;++e)t.children[e].classList.remove("highlight");r&&t.children[w(r[0],r[1])].classList.add("highlight");i.forEach((([e,n])=>{t.children[w(e,n)].classList.add("highlight")}))}()}function v(e){if(!n.classList.contains("hidden"))return;const o=Number(this.dataset.row),c=Number(this.dataset.col),f=l[w(o,c)];if(r){if(i.some((t=>t[0]===o&&t[1]===c))){const e=l[w(r[0],r[1])];return 1===e&&0===o||9===e&&7===o?void function(e,l,s,o,c){n.innerHTML="",n.classList.remove("hidden");const f=["q","r","b","n"];f.forEach((t=>{const e=document.createElement("img");e.src=`pieceImages/${s}${t}.png`,e.className="promo-piece",e.alt=t,e.onclick=()=>{Q(o,c,t),n.classList.add("hidden"),r=null,i=[],q(),I()},n.appendChild(e)}));const a=t.getBoundingClientRect(),u=t.offsetWidth/8,h=a.left+l*u+window.scrollX,d=a.top+e*u+window.scrollY;n.style.left=h+u/2-(48*f.length+8*(f.length-1))/2+"px",n.style.top=d-56+"px"}(o,c,s,[...r],[o,c]):(Q(r,[o,c]),r=null,i=[],q(),void I())}r=null,i=[],q()}else f&&p[f]===s&&(r=[o,c],i=E(o,c),q())}function E(t,e){const n=[],r=l[w(t,e)];if(!r)return n;const i=p[r],u=b[r],h={p:"w"===i?[[-1,0]]:[[1,0]],n:[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],b:[[-1,-1],[-1,1],[1,-1],[1,1]],r:[[-1,0],[1,0],[0,-1],[0,1]],q:[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]],k:[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]};if("p"===u){let s="w"===i?-1:1;L(t+s,e)&&!l[w(t+s,e)]&&(n.push([t+s,e]),("w"===i&&6===t||"b"===i&&1===t)&&(l[w(t+2*s,e)]||n.push([t+2*s,e])));for(let r of[-1,1])L(t+s,e+r)&&l[w(t+s,e+r)]&&p[l[w(t+s,e+r)]]!==i&&n.push([t+s,e+r]),o&&o[0]===t+s&&o[1]===e+r&&n.push([t+s,e+r])}else if("n"===u)for(let[s,r]of h.n)!L(t+s,e+r)||l[w(t+s,e+r)]&&p[l[w(t+s,e+r)]]===i||n.push([t+s,e+r]);else if("b"===u||"r"===u||"q"===u){const s="b"===u?h.b:"r"===u?h.r:h.q;for(let[r,o]of s)for(let s=1;s<8;s++){let c=t+r*s,f=e+o*s;if(!L(c,f))break;if(l[w(c,f)]){p[l[w(c,f)]]!==i&&n.push([c,f]);break}n.push([c,f])}}else if("k"===u){for(let[s,r]of h.k){let o=t+s,c=e+r;!L(o,c)||l[w(o,c)]&&p[l[w(o,c)]]===i||n.push([o,c])}y(i)||(c[i].K&&C(i,!0)&&n.push([t,e+2]),c[i].Q&&C(i,!1)&&n.push([t,e-2]))}return n.filter((([n,r])=>!function(t,e,n,r){const i={board:g(l),enPassant:o?[...o]:null,castling:JSON.parse(JSON.stringify(c)),turn:s,halfmove:f,fullmove:a};let u=l[w(t,e)],h=(l[w(n,r)],o&&n===o[0]&&r===o[1]),d=null;if(h&&"p"===b[u]){d=w(n+("w"===p[u]?1:-1),r),l[d]=0}l[w(n,r)]=u,l[w(t,e)]=0,"k"===b[u]&&2===Math.abs(r-e)&&(r>e?(l[w(t,5)]=l[w(t,7)],l[w(t,7)]=0):(l[w(t,3)]=l[w(t,0)],l[w(t,0)]=0));let m=y(p[u]);return l=i.board,o=i.enPassant,c=i.castling,s=i.turn,f=i.halfmove,a=i.fullmove,m}(t,e,n,r)))}function L(t,e){return t>=0&&t<8&&e>=0&&e<8}function y(t){let e=-1;for(let n=0;n<64;n++)if(l[n]&&p[l[n]]===t&&"k"===b[l[n]]){e=n;break}if(-1===e)return!1;const[n,s]=m(e);for(let e=0;e<8;e++)for(let r=0;r<8;r++){let i=l[w(e,r)];if(i&&p[i]!==t){if(B(e,r).some((([t,e])=>t===n&&e===s)))return!0}}return!1}function B(t,e,n=!0){const s=[],r=l[w(t,e)];if(!r)return s;const i=p[r],f=b[r],a={p:"w"===i?[[-1,0]]:[[1,0]],n:[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],b:[[-1,-1],[-1,1],[1,-1],[1,1]],r:[[-1,0],[1,0],[0,-1],[0,1]],q:[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]],k:[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]};if("p"===f){let n="w"===i?-1:1;L(t+n,e)&&!l[w(t+n,e)]&&s.push([t+n,e]),("w"===i&&6===t||"b"===i&&1===t)&&(l[w(t+n,e)]||l[w(t+2*n,e)]||s.push([t+2*n,e]));for(let r of[-1,1])L(t+n,e+r)&&l[w(t+n,e+r)]&&p[l[w(t+n,e+r)]]!==i&&s.push([t+n,e+r]),o&&o[0]===t+n&&o[1]===e+r&&s.push([t+n,e+r])}else if("n"===f)for(let[n,r]of a.n)!L(t+n,e+r)||l[w(t+n,e+r)]&&p[l[w(t+n,e+r)]]===i||s.push([t+n,e+r]);else if("b"===f||"r"===f||"q"===f){const n="b"===f?a.b:"r"===f?a.r:a.q;for(let[r,o]of n)for(let n=1;n<8;n++){let c=t+r*n,f=e+o*n;if(!L(c,f))break;if(l[w(c,f)]){p[l[w(c,f)]]!==i&&s.push([c,f]);break}s.push([c,f])}}else if("k"===f){for(let[n,r]of a.k){let o=t+n,c=e+r;!L(o,c)||l[w(o,c)]&&p[l[w(o,c)]]===i||s.push([o,c])}n&&(c[i].K&&C(i,!0)&&s.push([t,e+2]),c[i].Q&&C(i,!1)&&s.push([t,e-2]))}return s}function C(t,e){let n="w"===t?7:0;return e?!l[w(n,5)]&&!l[w(n,6)]&&(!(K(n,4,t)||K(n,5,t)||K(n,6,t))&&l[w(n,7)]===("w"===t?4:12)):!(l[w(n,1)]||l[w(n,2)]||l[w(n,3)])&&(!(K(n,4,t)||K(n,3,t)||K(n,2,t))&&l[w(n,0)]===("w"===t?4:12))}function K(t,e,n){for(let s=0;s<64;s++){let r=l[s];if(r&&p[r]!==n){let[n,l]=m(s);if(B(n,l,!1).some((([n,l])=>n===t&&l===e)))return!0}}return!1}function Q(t,e,n){let[r,i]=t,[u,h]=e,d=w(r,i),m=w(u,h),g=l[d],k=l[m];if("k"===b[g]&&2===Math.abs(h-i))h>i?(l[d]=0,l[m]=g,l[w(r,7)]=0,l[w(r,5)]="w"===s?4:12):(l[d]=0,l[m]=g,l[w(r,0)]=0,l[w(r,3)]="w"===s?4:12),c[s].K=!1,c[s].Q=!1;else{if("p"===b[g]&&o&&u===o[0]&&h===o[1]){l[w(u+("w"===s?1:-1),h)]=0}l[d]=0,l[m]=g,n&&(l[m]="w"===s?"q"===n?5:"r"===n?4:"b"===n?3:2:"q"===n?13:"r"===n?12:"b"===n?11:10),"k"===b[g]&&(c[s].K=!1,c[s].Q=!1),"r"===b[g]&&r===("w"===s?7:0)&&(0===i&&(c[s].Q=!1),7===i&&(c[s].K=!1)),k&&"r"===b[k]&&u===("w"===p[k]?7:0)&&(0===h&&(c[p[k]].Q=!1),7===h&&(c[p[k]].K=!1))}o="p"===b[g]&&2===Math.abs(u-r)?[(r+u)/2,i]:null,"p"===b[g]||k?f=0:f++,"b"===s&&a++,s="w"===s?"b":"w"}function I(){let t=[];for(let e=0;e<64;e++)if(l[e]&&p[l[e]]===s){let[n,l]=m(e);t=t.concat(E(n,l))}y(s)?0===t.length?e.textContent=("w"===s?"White":"Black")+" is checkmated. "+("w"===s?"Black":"White")+" wins!":e.textContent=("w"===s?"White":"Black")+" is in check.":0===t.length?e.textContent="Stalemate!":e.textContent=("w"===s?"White":"Black")+"'s turn"}document.getElementById("flip-btn").addEventListener("click",(()=>{h=!h,q()})),k(),document.getElementById("reset-btn").addEventListener("click",k);

const perftWorker = `
let l, s, o, c, f, a;
const p = ${JSON.stringify(p)}, b = ${JSON.stringify(b)};
${w.toString()}
${m.toString()}
${g.toString()}
${L.toString()}
${y.toString()}
${B.toString()}
${C.toString()}
${K.toString()}
${E.toString()}
${Q.toString()}

const perftCache = new Map();

function runPerft(depth) {
    if (depth === 0) return 1;
    let nodes = 0;
    const boardKey = l.join(',') + s + (o ? o.join('') : '') + c.w.K + c.w.Q + c.b.K + c.b.Q;
    const cacheKey = boardKey + '_' + depth;
    if (perftCache.has(cacheKey)) return perftCache.get(cacheKey);
    const savedO = o ? [o[0], o[1]] : null;
    const swK = c.w.K, swQ = c.w.Q, sbK = c.b.K, sbQ = c.b.Q;
    const savedS = s, savedF = f, savedA = a;

    for (let j = 0; j < 64; j++) {
        if (l[j] && p[l[j]] === s) {
            const row = Math.floor(j/8), col = j%8;
            const moves = E(row, col);
            
            for (let k = 0; k < moves.length; k++) {
                const move = moves[k];
                
                const fromIdx = j;
                const toIdx = 8 * move[0] + move[1];
                const movingPiece = l[fromIdx];
                const capturedPiece = l[toIdx];

                Q([row, col], move);
                
                nodes += (depth === 1) ? 1 : runPerft(depth - 1);

                l[fromIdx] = movingPiece;
                l[toIdx] = capturedPiece;

                if (movingPiece === 6 || movingPiece === 14) {
                    if (col - move[1] === -2) {
                        l[8 * row + 7] = l[8 * row + 5]; l[8 * row + 5] = 0;
                    } else if (col - move[1] === 2) {
                        l[8 * row + 0] = l[8 * row + 3]; l[8 * row + 3] = 0;
                    }
                }
                if ((movingPiece === 1 || movingPiece === 9) && savedO && move[0] === savedO[0] && move[1] === savedO[1]) {
                    const epCapIdx = 8 * (move[0] + (movingPiece === 1 ? 1 : -1)) + move[1];
                    l[epCapIdx] = movingPiece === 1 ? 9 : 1;
                    l[toIdx] = 0;
                }
                o = savedO ? [savedO[0], savedO[1]] : null;
                c.w.K = swK; c.w.Q = swQ; c.b.K = sbK; c.b.Q = sbQ;
                s = savedS; f = savedF; a = savedA;
            }
        }
    }
    perftCache.set(cacheKey, nodes);
    return nodes;
}


self.onmessage = function(msg) {
    const d = msg.data;
    l = g(d.l); s = d.s; o = d.o; c = d.c; f = d.f; a = d.a;
    self.postMessage(runPerft(d.depth));
};
`;


async function perft(depth) {
    const start = performance.now();
    const rootMoves = [];
    for (let j = 0; j < 64; j++) {
        if (l[j] && p[l[j]] === s) {
            const [r, col] = m(j);
            E(r, col).forEach(move => rootMoves.push({f: [r, col], t: move}));
        }
    }

    if (depth <= 1) return rootMoves.length;

    const coreCount = navigator.hardwareConcurrency || 4;
    const blob = new Blob([perftWorker], {type: 'application/javascript'});
    const workerUrl = URL.createObjectURL(blob);
    
    let totalNodes = 0;
    let moveIndex = 0;
    const workers = [];

    return new Promise(resolve => {
        const onTaskComplete = (e, worker) => {
            totalNodes += e.data;
            if (moveIndex < rootMoves.length) {
                sendMoveToWorker(worker, rootMoves[moveIndex++]);
            } else {
                worker.terminate();
                if (++completedWorkers === coreCount) {
                    URL.revokeObjectURL(workerUrl);
                    const end = performance.now();
                    console.log(`Perft(${depth}): ${totalNodes} nodes in ${(end-start).toFixed(2)}ms`);
                    resolve(totalNodes);
                }
            }
        };

        let completedWorkers = 0;
        const sendMoveToWorker = (worker, move) => {
            const saved = {l: g(l), s, o: o?[...o]:null, c: JSON.parse(JSON.stringify(c)), f, a};
            Q(move.f, move.t);
            worker.postMessage({depth: depth - 1, l: g(l), s, o, c, f, a});
            l.set(saved.l); s = saved.s; o = saved.o; c = saved.c; f = saved.f; a = saved.a;
        };

        for (let i = 0; i < coreCount; i++) {
            const worker = new Worker(workerUrl);
            worker.onmessage = (e) => onTaskComplete(e, worker);
            workers.push(worker);
            if (moveIndex < rootMoves.length) {
                sendMoveToWorker(worker, rootMoves[moveIndex++]);
            } else {
                worker.terminate();
                completedWorkers++;
            }
        }
    });
}

