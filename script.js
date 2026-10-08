tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                industrial: {
                    50: '#f4f6f8',
                    100: '#e9ecef',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    850: '#1e293b',
                    900: '#0f172a',
                }
            }
        }
    }
};

// Initial Mock Database State
let appState = {
    cargas: [
        { id: 'CG-8920', produto: 'Bobinas de Aço Galvanizado', peso: 28.5, origem: 'Planta Siderúrgica SP', destino: 'Polo Metalúrgico MG', status: 'Em Trânsito' },
        { id: 'CG-8921', produto: 'Minério de Ferro Granel', peso: 42.0, origem: 'Mina Serra Norte', destino: 'Terminal Portuário ES', status: 'Entregue' },
        { id: 'CG-8922', produto: 'Produtos Químicos Industriais', peso: 18.0, origem: 'Refinaria Polo Sul', destino: 'Fábrica de Polímeros SC', status: 'Em Trânsito' },
        { id: 'CG-8923', produto: 'Estruturas Metálicas Modulares', peso: 15.2, origem: 'Metalúrgica Central', destino: 'Canteiro de Obras PR', status: 'Aguardando Coleta' },
        { id: 'CG-8924', produto: 'Resina Plástica em Fardos', peso: 22.0, origem: 'Química Industrial SP', destino: 'Indústria de Embalagens RS', status: 'Atrasado' }
    ],
    veiculos: [
        { id: 'ABC-1234', modelo: 'Scania R450 6x4 (Cavalo Mecânico)', capacidade: 48.0, status: 'Em Trânsito' },
        { id: 'DEF-5678', modelo: 'Volvo FH 540 (Carreta Graneleira)', capacidade: 52.0, status: 'Disponível' },
        { id: 'GHI-9012', modelo: 'Mercedes-Benz Actros (Baú Sider)', capacidade: 30.0, status: 'Em Trânsito' },
        { id: 'JKL-3456', modelo: 'Volkswagen Constellation 24.280', capacidade: 24.0, status: 'Manutenção' }
    ],
    motoristas: [
        { id: 'MOT-01', nome: 'Roberto Santos', cnh: '12345678900 (Cat. E)', telefone: '(11) 98765-4321', status: 'Em Viagem' },
        { id: 'MOT-02', nome: 'Marcos Oliveira', cnh: '98765432100 (Cat. E)', telefone: '(19) 97123-4567', status: 'Disponível' },
        { id: 'MOT-03', nome: 'Antônio Carlos Souza', cnh: '45612378900 (Cat. D)', telefone: '(41) 99887-1122', status: 'Em Viagem' },
        { id: 'MOT-04', nome: 'Juliano Ferreira', cnh: '78945612300 (Cat. E)', telefone: '(21) 98222-3344', status: 'Férias' }
    ],
    rotas: [
        { id: 'ROT-101', nome: 'Corredor Siderúrgico SP-MG', origem: 'Planta Siderúrgica SP', destino: 'Polo Metalúrgico MG', distancia: '520 km', tempo: '7h 30m' },
        { id: 'ROT-102', nome: 'Rota Minério ES', origem: 'Mina Serra Norte', destino: 'Terminal Portuário ES', distancia: '380 km', tempo: '5h 45m' },
        { id: 'ROT-103', nome: 'Eixo Sul Petroquímico', origem: 'Refinaria Polo Sul', destino: 'Fábrica de Polímeros SC', distancia: '290 km', tempo: '4h 15m' }
    ]
};

// Navigation Management
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
    });

    const target = document.getElementById('tab-' + tabId);
    if (target) {
        target.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-600/30');
        link.classList.add('text-slate-300', 'hover:bg-slate-800/70', 'hover:text-white');
        if (link.getAttribute('data-target') === tabId) {
            link.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-600/30');
            link.classList.remove('text-slate-300', 'hover:bg-slate-800/70', 'hover:text-white');
        }
    });

    document.getElementById('sidebar').classList.add('-translate-x-full');

    if (tabId === 'dashboard') renderDashboard();
    if (tabId === 'cargas') renderCargasTable();
    if (tabId === 'veiculos') renderVeiculosTable();
    if (tabId === 'motoristas') renderMotoristasTable();
    if (tabId === 'rotas') renderRotasTable();
    if (tabId === 'status') renderStatusCards();
}

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('-translate-x-full');
});

document.getElementById('mobile-menu-close').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('-translate-x-full');
});

function showNotification(message, type = 'success') {
    const toast = document.getElementById('toast-notification');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');

    msgEl.textContent = message;
    if (type === 'success') {
        iconEl.className = 'fa-solid fa-circle-check text-emerald-400 text-lg';
    } else if (type === 'info') {
        iconEl.className = 'fa-solid fa-circle-info text-blue-400 text-lg';
    } else if (type === 'error') {
        iconEl.className = 'fa-solid fa-triangle-exclamation text-amber-400 text-lg';
    }

    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3500);
}

function renderDashboard() {
    document.getElementById('kpi-transito').textContent = appState.cargas.filter(c => c.status === 'Em Trânsito').length;
    document.getElementById('kpi-veiculos').textContent = appState.veiculos.length;
    document.getElementById('kpi-motoristas').textContent = appState.motoristas.length;
    document.getElementById('kpi-concluidas').textContent = 142 + appState.cargas.filter(c => c.status === 'Entregue').length;

    const tbody = document.getElementById('dashboard-cargas-table');
    tbody.innerHTML = '';
    appState.cargas.slice(0, 4).forEach(carga => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="py-3 px-3 font-semibold text-slate-800">${carga.id}</td>
                <td class="py-3 px-3 text-slate-600">${carga.produto}</td>
                <td class="py-3 px-3 text-slate-600">${carga.destino}</td>
                <td class="py-3 px-3">${renderStatusBadge(carga.status)}</td>
            </tr>
        `;
    });
}

function renderStatusBadge(status) {
    let classes = 'bg-slate-100 text-slate-700 border-slate-200';
    if (status === 'Em Trânsito') classes = 'bg-blue-50 text-blue-700 border-blue-200';
    else if (status === 'Entregue') classes = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    else if (status === 'Aguardando Coleta') classes = 'bg-amber-50 text-amber-700 border-amber-200';
    else if (status === 'Atrasado') classes = 'bg-rose-50 text-rose-700 border-rose-200';
    else if (status === 'Disponível') classes = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    else if (status === 'Manutenção') classes = 'bg-rose-50 text-rose-700 border-rose-200';

    return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${classes}">${status}</span>`;
}

function renderCargasTable() {
    const search = document.getElementById('filter-cargas-search').value.toLowerCase();
    const statusFilter = document.getElementById('filter-cargas-status').value;
    const tbody = document.getElementById('cargas-table-body');
    tbody.innerHTML = '';

    const filtered = appState.cargas.filter(c => {
        const matchSearch = c.id.toLowerCase().includes(search) || c.produto.toLowerCase().includes(search) || c.destino.toLowerCase().includes(search);
        const matchStatus = statusFilter === '' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-400 text-xs">Nenhuma carga encontrada.</td></tr>`;
        return;
    }

    filtered.forEach(carga => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="py-3.5 px-4 font-semibold text-slate-800">${carga.id}</td>
                <td class="py-3.5 px-4 text-slate-700">${carga.produto}</td>
                <td class="py-3.5 px-4 text-slate-600 font-mono">${carga.peso} t</td>
                <td class="py-3.5 px-4 text-slate-600 text-xs">${carga.origem}</td>
                <td class="py-3.5 px-4 text-slate-600 text-xs">${carga.destino}</td>
                <td class="py-3.5 px-4">${renderStatusBadge(carga.status)}</td>
                <td class="py-3.5 px-4 text-right space-x-2">
                    <button onclick="editCarga('${carga.id}')" class="text-slate-400 hover:text-blue-600 p-1 transition"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteCarga('${carga.id}')" class="text-slate-400 hover:text-rose-600 p-1 transition"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function renderVeiculosTable() {
    const tbody = document.getElementById('veiculos-table-body');
    tbody.innerHTML = '';
    appState.veiculos.forEach(v => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="py-3.5 px-4 font-semibold text-slate-800 font-mono">${v.id}</td>
                <td class="py-3.5 px-4 text-slate-700">${v.modelo}</td>
                <td class="py-3.5 px-4 text-slate-600 font-mono">${v.capacidade} t</td>
                <td class="py-3.5 px-4">${renderStatusBadge(v.status)}</td>
                <td class="py-3.5 px-4 text-right space-x-2">
                    <button onclick="deleteVeiculo('${v.id}')" class="text-slate-400 hover:text-rose-600 p-1 transition"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function renderMotoristasTable() {
    const tbody = document.getElementById('motoristas-table-body');
    tbody.innerHTML = '';
    appState.motoristas.forEach(m => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="py-3.5 px-4 font-semibold text-slate-800">${m.nome}</td>
                <td class="py-3.5 px-4 text-slate-600 font-mono text-xs">${m.cnh}</td>
                <td class="py-3.5 px-4 text-slate-600 text-xs">${m.telefone}</td>
                <td class="py-3.5 px-4">${renderStatusBadge(m.status)}</td>
                <td class="py-3.5 px-4 text-right space-x-2">
                    <button onclick="deleteMotorista('${m.id}')" class="text-slate-400 hover:text-rose-600 p-1 transition"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function renderRotasTable() {
    const tbody = document.getElementById('rotas-table-body');
    tbody.innerHTML = '';
    appState.rotas.forEach(r => {
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="py-3.5 px-4 font-semibold text-slate-800">${r.nome}</td>
                <td class="py-3.5 px-4 text-slate-600 text-xs">${r.origem}</td>
                <td class="py-3.5 px-4 text-slate-600 text-xs">${r.destino}</td>
                <td class="py-3.5 px-4 font-mono text-xs text-slate-700">${r.distancia}</td>
                <td class="py-3.5 px-4 font-mono text-xs text-slate-700">${r.tempo}</td>
                <td class="py-3.5 px-4 text-right">
                    <button onclick="deleteRota('${r.id}')" class="text-slate-400 hover:text-rose-600 p-1 transition"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function renderStatusCards() {
    const search = document.getElementById('status-search-input').value.toLowerCase();
    const grid = document.getElementById('status-cards-grid');
    grid.innerHTML = '';

    const filtered = appState.cargas.filter(c => c.id.toLowerCase().includes(search) || c.produto.toLowerCase().includes(search));

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="text-slate-400 text-xs col-span-3 text-center py-6">Nenhum registro encontrado para atualização de status.</p>`;
        return;
    }

    filtered.forEach(c => {
        grid.innerHTML += `
            <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="font-bold font-mono text-slate-800 text-sm">${c.id}</span>
                        ${renderStatusBadge(c.status)}
                    </div>
                    <p class="text-xs font-semibold text-slate-700">${c.produto}</p>
                    <p class="text-[11px] text-slate-500 mt-1">De: ${c.origem}</p>
                    <p class="text-[11px] text-slate-500">Para: ${c.destino}</p>
                </div>
                <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-xs text-slate-400">Alterar Status:</span>
                    <select onchange="updateCargaStatus('${c.id}', this.value)" class="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                        <option value="Aguardando Coleta" ${c.status === 'Aguardando Coleta' ? 'selected' : ''}>Aguardando Coleta</option>
                        <option value="Em Trânsito" ${c.status === 'Em Trânsito' ? 'selected' : ''}>Em Trânsito</option>
                        <option value="Entregue" ${c.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
                        <option value="Atrasado" ${c.status === 'Atrasado' ? 'selected' : ''}>Atrasado</option>
                    </select>
                </div>
            </div>
        `;
    });
}

function updateCargaStatus(id, newStatus) {
    const carga = appState.cargas.find(c => c.id === id);
    if (carga) {
        carga.status = newStatus;
        showNotification(`Status da carga ${id} atualizado para "${newStatus}"`, 'success');
        renderDashboard();
    }
}

function handleGlobalSearch(query) {
    if (!query) return;
    switchTab('cargas');
    document.getElementById('filter-cargas-search').value = query;
    renderCargasTable();
}

function openModal(htmlContent) {
    const modal = document.getElementById('app-modal');
    const box = document.getElementById('modal-content-box');
    box.innerHTML = htmlContent;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('app-modal').classList.add('hidden');
}

function openNewCargaModal() {
    openModal(`
        <div class="p-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 class="font-bold text-base text-slate-800">Cadastrar Nova Carga Industrial</h3>
                <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <form id="form-new-carga" onsubmit="handleNewCargaSubmit(event)" class="space-y-4 pt-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Código da Carga</label>
                    <input type="text" id="new-c-id" required value="CG-${Math.floor(1000 + Math.random() * 9000)}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Produto / Matéria-Prima</label>
                    <input type="text" id="new-c-produto" required placeholder="Ex: Bobinas de Alumínio" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Peso (Ton)</label>
                        <input type="number" step="0.1" id="new-c-peso" required placeholder="25.0" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Status Inicial</label>
                        <select id="new-c-status" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                            <option value="Aguardando Coleta">Aguardando Coleta</option>
                            <option value="Em Trânsito">Em Trânsito</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Origem (Planta / Mina)</label>
                    <input type="text" id="new-c-origem" required placeholder="Planta Fabril SP" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Destino (Cliente / CD)</label>
                    <input type="text" id="new-c-destino" required placeholder="Centro de Distribuição PR" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="pt-4 flex justify-end space-x-3">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-blue-500/25">Salvar Carga</button>
                </div>
            </form>
        </div>
    `);
}

function handleNewCargaSubmit(e) {
    e.preventDefault();
    const newCarga = {
        id: document.getElementById('new-c-id').value,
        produto: document.getElementById('new-c-produto').value,
        peso: parseFloat(document.getElementById('new-c-peso').value),
        origem: document.getElementById('new-c-origem').value,
        destino: document.getElementById('new-c-destino').value,
        status: document.getElementById('new-c-status').value
    };
    appState.cargas.unshift(newCarga);
    closeModal();
    showNotification(`Carga ${newCarga.id} cadastrada com sucesso!`, 'success');
    renderCargasTable();
    renderDashboard();
}

function deleteCarga(id) {
    appState.cargas = appState.cargas.filter(c => c.id !== id);
    showNotification(`Carga ${id} removida com sucesso.`, 'info');
    renderCargasTable();
    renderDashboard();
}

function openNewVeiculoModal() {
    openModal(`
        <div class="p-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 class="font-bold text-base text-slate-800">Cadastrar Novo Veículo</h3>
                <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <form onsubmit="handleNewVeiculoSubmit(event)" class="space-y-4 pt-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Placa / Identificação</label>
                    <input type="text" id="new-v-id" required placeholder="XYZ-9876" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Modelo / Tipo</label>
                    <input type="text" id="new-v-modelo" required placeholder="Volvo FH 460 Carreta" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Capacidade (Ton)</label>
                        <input type="number" step="0.1" id="new-v-cap" required placeholder="45.0" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                        <select id="new-v-status" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                            <option value="Disponível">Disponível</option>
                            <option value="Em Trânsito">Em Trânsito</option>
                            <option value="Manutenção">Manutenção</option>
                        </select>
                    </div>
                </div>
                <div class="pt-4 flex justify-end space-x-3">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-blue-500/25">Cadastrar Veículo</button>
                </div>
            </form>
        </div>
    `);
}

function handleNewVeiculoSubmit(e) {
    e.preventDefault();
    const newV = {
        id: document.getElementById('new-v-id').value.toUpperCase(),
        modelo: document.getElementById('new-v-modelo').value,
        capacidade: parseFloat(document.getElementById('new-v-cap').value),
        status: document.getElementById('new-v-status').value
    };
    appState.veiculos.push(newV);
    closeModal();
    showNotification(`Veículo ${newV.id} cadastrado com sucesso!`, 'success');
    renderVeiculosTable();
}

function deleteVeiculo(id) {
    appState.veiculos = appState.veiculos.filter(v => v.id !== id);
    showNotification(`Veículo ${id} removido.`, 'info');
    renderVeiculosTable();
}

function openNewMotoristaModal() {
    openModal(`
        <div class="p-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 class="font-bold text-base text-slate-800">Cadastrar Novo Motorista</h3>
                <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <form onsubmit="handleNewMotoristaSubmit(event)" class="space-y-4 pt-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Nome Completo</label>
                    <input type="text" id="new-m-nome" required placeholder="João da Silva" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">CNH e Categoria</label>
                    <input type="text" id="new-m-cnh" required placeholder="12345678900 (Cat. E)" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Telefone</label>
                        <input type="text" id="new-m-tel" required placeholder="(11) 99999-9999" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                        <select id="new-m-status" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                            <option value="Disponível">Disponível</option>
                            <option value="Em Viagem">Em Viagem</option>
                            <option value="Férias">Férias</option>
                        </select>
                    </div>
                </div>
                <div class="pt-4 flex justify-end space-x-3">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-blue-500/25">Cadastrar Motorista</button>
                </div>
            </form>
        </div>
    `);
}

function handleNewMotoristaSubmit(e) {
    e.preventDefault();
    const newM = {
        id: 'MOT-' + Math.floor(10 + Math.random() * 90),
        nome: document.getElementById('new-m-nome').value,
        cnh: document.getElementById('new-m-cnh').value,
        telefone: document.getElementById('new-m-tel').value,
        status: document.getElementById('new-m-status').value
    };
    appState.motoristas.push(newM);
    closeModal();
    showNotification(`Motorista ${newM.nome} cadastrado!`, 'success');
    renderMotoristasTable();
}

function deleteMotorista(id) {
    appState.motoristas = appState.motoristas.filter(m => m.id !== id);
    showNotification('Motorista removido.', 'info');
    renderMotoristasTable();
}

function openNewRotaModal() {
    openModal(`
        <div class="p-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 class="font-bold text-base text-slate-800">Cadastrar Nova Rota Industrial</h3>
                <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <form onsubmit="handleNewRotaSubmit(event)" class="space-y-4 pt-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Nome da Rota</label>
                    <input type="text" id="new-r-nome" required placeholder="Corredor Industrial Norte" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Origem</label>
                    <input type="text" id="new-r-origem" required placeholder="Planta Fabril A" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Destino</label>
                    <input type="text" id="new-r-destino" required placeholder="Centro de Distribuição B" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Distância</label>
                        <input type="text" id="new-r-dist" required placeholder="450 km" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Tempo Médio</label>
                        <input type="text" id="new-r-tempo" required placeholder="6h 30m" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
                <div class="pt-4 flex justify-end space-x-3">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-blue-500/25">Cadastrar Rota</button>
                </div>
            </form>
        </div>
    `);
}

function handleNewRotaSubmit(e) {
    e.preventDefault();
    const newR = {
        id: 'ROT-' + Math.floor(100 + Math.random() * 900),
        nome: document.getElementById('new-r-nome').value,
        origem: document.getElementById('new-r-origem').value,
        destino: document.getElementById('new-r-destino').value,
        distancia: document.getElementById('new-r-dist').value,
        tempo: document.getElementById('new-r-tempo').value
    };
    appState.rotas.push(newR);
    closeModal();
    showNotification(`Rota ${newR.nome} salva!`, 'success');
    renderRotasTable();
}

function deleteRota(id) {
    appState.rotas = appState.rotas.filter(r => r.id !== id);
    showNotification('Rota removida.', 'info');
    renderRotasTable();
}

function selectTrackingVehicle(cargaId) {
    const carga = appState.cargas.find(c => c.id === cargaId);
    if (carga) {
        const telemetryBox = document.getElementById('telemetry-details');
        telemetryBox.innerHTML = `
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p class="text-xs text-slate-400 uppercase font-semibold">Veículo Selecionado</p>
                <p class="text-base font-bold text-slate-800 mt-0.5">${carga.id} - ${carga.produto}</p>
                <div class="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200/60 text-xs">
                    <div>
                        <span class="text-slate-400 block">Status</span>
                        <span class="font-bold text-blue-600 text-sm">${carga.status}</span>
                    </div>
                    <div>
                        <span class="text-slate-400 block">Peso</span>
                        <span class="font-bold text-slate-700 text-sm">${carga.peso} Ton</span>
                    </div>
                    <div>
                        <span class="text-slate-400 block">Origem</span>
                        <span class="font-semibold text-slate-700">${carga.origem}</span>
                    </div>
                    <div>
                        <span class="text-slate-400 block">Destino</span>
                        <span class="font-semibold text-emerald-600">${carga.destino}</span>
                    </div>
                </div>
            </div>
            <div class="space-y-2 mt-4">
                <p class="text-xs font-bold text-slate-700">Telemetria em Tempo Real:</p>
                <div class="text-xs space-y-1.5 text-slate-600">
                    <p class="flex items-center"><i class="fa-solid fa-satellite text-blue-500 mr-2 text-[10px]"></i> Conexão Starlink Ativa</p>
                    <p class="flex items-center"><i class="fa-solid fa-gauge text-blue-500 mr-2 text-[10px]"></i> Velocidade Média: 75 km/h</p>
                </div>
            </div>
        `;
        showNotification(`Carregados dados de telemetria para ${cargaId}`, 'info');
    }
}

window.onload = function() {
    renderDashboard();
};
