
        // Navigation
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show corresponding section
                const sectionId = this.getAttribute('data-section');
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(sectionId).classList.add('active');
            });
        });

        // Toast notification function
        function showToast(message, type = 'success') {
            const toastContainer = document.querySelector('.toast-container');
            const toast = document.createElement('div');
            toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
            
            // Remove toast after it's hidden
            toast.addEventListener('hidden.bs.toast', function() {
                toastContainer.removeChild(toast);
            });
        }

        // Adicionar novo cargo
        document.getElementById('btnAddRole').addEventListener('click', function() {
            const addRoleModal = new bootstrap.Modal(document.getElementById('addRoleModal'));
            addRoleModal.show();
        });

        document.getElementById('saveRole').addEventListener('click', function() {
            const newRoleName = document.getElementById('newRoleName').value;
            if (newRoleName) {
                const roleSelect = document.getElementById('role');
                const newOption = document.createElement('option');
                newOption.value = newRoleName.toLowerCase().replace(/\s/g, '_');
                newOption.textContent = newRoleName;
                roleSelect.appendChild(newOption);
                newOption.selected = true;
                
                const addRoleModal = bootstrap.Modal.getInstance(document.getElementById('addRoleModal'));
                addRoleModal.hide();
                document.getElementById('newRoleName').value = '';
                
                showToast('Cargo adicionado com sucesso!');
            }
        });

        // Adicionar novo departamento
        document.getElementById('btnAddDepartment').addEventListener('click', function() {
            const addDepartmentModal = new bootstrap.Modal(document.getElementById('addDepartmentModal'));
            addDepartmentModal.show();
        });

        document.getElementById('saveDepartment').addEventListener('click', function() {
            const newDepartmentName = document.getElementById('newDepartmentName').value;
            if (newDepartmentName) {
                const departmentSelect = document.getElementById('department');
                const newOption = document.createElement('option');
                newOption.value = newDepartmentName.toLowerCase().replace(/\s/g, '_');
                newOption.textContent = newDepartmentName;
                departmentSelect.appendChild(newOption);
                newOption.selected = true;
                
                const addDepartmentModal = bootstrap.Modal.getInstance(document.getElementById('addDepartmentModal'));
                addDepartmentModal.hide();
                document.getElementById('newDepartmentName').value = '';
                
                showToast('Departamento adicionado com sucesso!');
            }
        });

        // Salvar colaborador
        document.getElementById('saveCollaborator').addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const role = document.getElementById('role').value;
            const admission = document.getElementById('admission').value;
            const type = document.getElementById('type').value;
            const department = document.getElementById('department').value;
            
            if (name && role && admission && type && department) {
                // Simular salvamento bem-sucedido
                const addCollaboratorModal = bootstrap.Modal.getInstance(document.getElementById('addCollaboratorModal'));
                addCollaboratorModal.hide();
                
                // Limpar formulário
                document.getElementById('collaboratorForm').reset();
                
                showToast('Colaborador cadastrado com sucesso!');
            } else {
                showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            }
        });

        // Visualizar histórico de avaliações
        document.querySelectorAll('.collaborator-details').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const collaboratorId = this.getAttribute('data-id');
                const collaboratorName = this.textContent;
                
                document.getElementById('collaboratorName').textContent = collaboratorName;
                
                const evaluationHistoryModal = new bootstrap.Modal(document.getElementById('evaluationHistoryModal'));
                evaluationHistoryModal.show();
            });
        });

        // Chart initialization
        document.addEventListener('DOMContentLoaded', function() {
            // Department Chart
            const departmentCtx = document.getElementById('departmentChart').getContext('2d');
            const departmentChart = new Chart(departmentCtx, {
                type: 'bar',
                data: {
                    labels: ['Diretoria', 'TI', 'Operações', 'RH', 'Financeiro', 'Comercial'],
                    datasets: [{
                        label: 'Média de Avaliação',
                        data: [8.2, 7.6, 7.1, 7.8, 7.4, 7.9],
                        backgroundColor: '#061578',
                        borderColor: '#051056',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });

            // Comparison Chart (Autoavaliação vs Avaliação do Gestor)
            const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
            const comparisonChart = new Chart(comparisonCtx, {
                type: 'radar',
                data: {
                    labels: ['Liderança', 'Comunicação', 'Gestão', 'Resultados', 'Inovação'],
                    datasets: [
                        {
                            label: 'Autoavaliação',
                            data: [8.5, 7.8, 8.2, 8.7, 7.5],
                            backgroundColor: 'rgba(81, 247, 153, 0.2)',
                            borderColor: '#51f799',
                            borderWidth: 2,
                            pointBackgroundColor: '#51f799'
                        },
                        {
                            label: 'Avaliação do Gestor',
                            data: [7.8, 8.2, 7.5, 8.9, 6.8],
                            backgroundColor: 'rgba(6, 21, 120, 0.2)',
                            borderColor: '#061578',
                            borderWidth: 2,
                            pointBackgroundColor: '#061578'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });

            // Performance Chart
            const performanceCtx = document.getElementById('performanceChart').getContext('2d');
            const performanceChart = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Jan/2022', 'Jul/2022', 'Jan/2023', 'Jul/2023'],
                    datasets: [{
                        label: 'Desempenho',
                        data: [7.2, 7.8, 8.1, 8.5],
                        backgroundColor: 'rgba(81, 247, 153, 0.2)',
                        borderColor: '#51f799',
                        borderWidth: 2,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });

            // Competence Chart
            const competenceCtx = document.getElementById('competenceChart').getContext('2d');
            const competenceChart = new Chart(competenceCtx, {
                type: 'bar',
                data: {
                    labels: ['Liderança', 'Comunicação', 'Gestão', 'Resultados', 'Inovação'],
                    datasets: [
                        {
                            label: 'Autoavaliação',
                            data: [8.5, 7.8, 8.2, 8.7, 7.5],
                            backgroundColor: '#51f799'
                        },
                        {
                            label: 'Avaliação Gestor',
                            data: [7.8, 8.2, 7.5, 8.9, 6.8],
                            backgroundColor: '#061578'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });

            // Potential Chart
            const potentialCtx = document.getElementById('potentialChart').getContext('2d');
            const potentialChart = new Chart(potentialCtx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Colaboradores',
                        data: [
                            {x: 7.2, y: 6.8},
                            {x: 8.5, y: 8.2},
                            {x: 6.8, y: 7.5},
                            {x: 9.2, y: 8.8},
                            {x: 7.5, y: 6.2},
                            {x: 8.8, y: 9.2}
                        ],
                        backgroundColor: '#061578'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Desempenho'
                            },
                            beginAtZero: true,
                            max: 10
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Potencial'
                            },
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });
        });

        // Form submissions
        document.getElementById('autoEvaluationManagerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Autoavaliação salva com sucesso!');
        });

        document.getElementById('generalSettingsForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Configurações salvas com sucesso!');
        });

        document.getElementById('databaseConfigForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Configurações de banco de dados salvas com sucesso!');
        });