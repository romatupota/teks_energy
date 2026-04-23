const API_URL = "https://teks_energy.onrender.com";

function showNotification(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (container) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background:none; border:none; color:white; cursor:pointer; margin-left:10px;">✕</button>
        `;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-fade-out');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    } else {
        alert(message);
    }
}

async function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    const params = new URLSearchParams();
    params.append('username', user);
    params.append('password', pass);

    try {
        const response = await fetch(`${API_URL}/login`, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params 
        });

        const data = await response.json();

        if (response.ok) {
            
            localStorage.setItem('access_token', data.access_token);
            showNotification("Успішний вхід!", "success");
            location.reload();
        } else {
            
            console.error("Login error details:", data);
            document.getElementById('login-error').innerText = data.detail || "Помилка входу";
            showNotification(data.detail || "Помилка входу", "error");
        }
    } catch (e) { 
        console.error("Fetch error:", e);
        showNotification("Сервер недоступний", 'error'); 
    }
}

function logout() {
    localStorage.removeItem('access_token');
    location.reload();
}

async function createNewAdmin() {
    const userField = document.getElementById('new-admin-user');
    const passField = document.getElementById('new-admin-pass');
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(`${API_URL}/admins`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ username: userField.value, password: passField.value })
        });

        if (response.ok) {
            showNotification(` Адміна ${userField.value} створено!`);
            userField.value = '';
            passField.value = '';
            loadAdmins();
        } else {
            const data = await response.json();
            showNotification("Помилка: " + (data.detail || "невідома помилка"), 'error');
        }
    } catch (e) { showNotification("Помилка з'єднання", 'error'); }
}

async function loadAdmins() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/admins`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const admins = await response.json();
            const list = document.getElementById('admins-list');
            list.innerHTML = admins.map(a => `
                <li>👤 <b>${a.username}</b> (${a.is_superuser ? 'Super' : 'Admin'})</li>
            `).join('');
        }
    } catch (e) { console.error("Не вдалося завантажити список адмінів"); }
}

function toggleAdminsList() {
    const cont = document.getElementById('admins-list-container');
    const btn = document.getElementById('toggle-admins-btn');
    if (cont.style.display === 'none' || cont.style.display === '') {
        cont.style.display = 'block';
        btn.innerText = 'Приховати список';
        loadAdmins();
    } else {
        cont.style.display = 'none';
        btn.innerText = 'Показати список';
    }
}

async function deleteAdmin() {
    const userField = document.getElementById('delete-username');
    const user = userField.value;
    const token = localStorage.getItem('access_token');
    
    if (!user) return showNotification("Введіть логін", "error");
    if (!confirm(`Видалити ${user}?`)) return;

    try {
        const response = await fetch(`${API_URL}/admins/${user}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            showNotification(`Видалено: ${user}`);
            userField.value = '';
            loadAdmins();
        } else {
            const data = await response.json();
            showNotification(data.detail || "Помилка видалення", 'error');
        }
    } catch (e) { showNotification("Помилка сервера", 'error'); }
}

async function saveProjectWithFile() {
    
    const token = localStorage.getItem('access_token');

    const titleEl = document.getElementById('content-title');
    const bodyEl = document.getElementById('content-body');
    const fileInput = document.getElementById('content-file');

    if (!token) {
        showNotification("Ви не авторизовані! Увійдіть в систему знову.", "error");
        return;
    }

    if (!titleEl || !bodyEl || !fileInput) {
        console.error("Помилка: Один з елементів (title, body або file) не знайдено в HTML!");
        return;
    }

    const titleVal = titleEl.value;
    const bodyVal = bodyEl.value;

    if (fileInput.files.length === 0) {
        showNotification("Виберіть хоча б одне фото", "error");
        return;
    }

    try {
        showNotification("Завантаження фото на сервер...");

        const formData = new FormData();
        for (let i = 0; i < fileInput.files.length; i++) {
            formData.append("files", fileInput.files[i]);
        }

        const uploadRes = await fetch(`${API_URL}/upload-multiple`, {
            method: "POST",
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (!uploadRes.ok) {
            const errData = await uploadRes.json();
            throw new Error(errData.detail || "Помилка завантаження файлів");
        }
        
        const urls = await uploadRes.json(); 

        const projectData = {
            title: titleVal,
            body: bodyVal,
            image_url: urls[0], 
            additional_images: urls.slice(1).join(',')
        };

        console.log("Відправка в БД:", projectData);

        const response = await fetch(`${API_URL}/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData)
        });

        if (response.ok) {
            showNotification("🚀 Проєкт опубліковано!");
            setTimeout(() => location.reload(), 1500);
        } else {
            const error = await response.json();
            showNotification("Помилка БД: " + (error.detail || "невідома"), "error");
        }
    } catch (e) {
        console.error("Критична помилка:", e);
        showNotification("Сталася помилка: " + e.message, "error");
    }
}
async function addContentWithUrl(imageUrl) {
    const title = document.getElementById('content-title').value;
    const body = document.getElementById('content-body').value;
    const token = localStorage.getItem('access_token');

    const response = await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ title, body, image_url: imageUrl })
    });

    if (response.ok) {
        alert("Проєкт збережено!");
        location.reload();
    }
}
async function loadContentList() {
    try {
        const response = await fetch(`${API_URL}/content`);
        const data = await response.json();
        const container = document.getElementById('edit-content-list');
        
        if (container) {
            if (data.length === 0) {
                container.innerHTML = '<p>Контент ще не створено</p>';
                return;
            }

            container.innerHTML = data.map((item, index) => `
                <div class="edit-card">
                    <div class="edit-card-header">
                        <span class="project-number">Проєкт №${index + 1}</span>
                        <span class="project-id">ID: ${item.id}</span>
                    </div>
                    
                    <div class="edit-fields">
                        <input type="text" id="edit-title-${item.id}" value="${item.title}" placeholder="Назва">
                        <textarea id="edit-body-${item.id}" rows="3">${item.body}</textarea>
                    </div>

                    <div class="folder-drop-zone" id="drop-zone-${item.id}" onclick="document.getElementById('edit-file-${item.id}').click()">
                        <p class="folder-text">Перетягніть нові фото сюди або клікніть, щоб змінити</p>
                        <input type="file" id="edit-file-${item.id}" multiple style="display:none" onchange="previewEditFiles(${item.id})">
                        
                        <div id="preview-${item.id}" class="edit-preview-grid">
                            <img src="${item.image_url}" class="preview-item">
                        </div>
                    </div>

                    <button class="btn-save" onclick="updateContentWithFiles(${item.id})">Зберегти зміни</button>
                </div>
            `).join('');

            data.forEach(item => {
                initDragAndDropForEdit(item.id);
            });
        }
    } catch (e) { 
        console.log("Помилка завантаження контенту", e); 
    }
}

async function updateContent(id) {
    const title = document.getElementById(`title-${id}`).value;
    const body = document.getElementById(`body-${id}`).value;
    const token = localStorage.getItem('access_token');
    const imageUrl = document.getElementById(`img-${id}`).value;
    // Додайте image_url у body запиту fetch
    body: JSON.stringify({ title, body, image_url: imageUrl })

    try {
        const response = await fetch(`${API_URL}/content/${id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ title, body })
        });

        if (response.ok) {
            showNotification("Зміни збережено!");
        } else {
            const data = await response.json();
            showNotification(data.detail || "Помилка оновлення", "error");
        }
    } catch (e) { showNotification("Помилка з'єднання", "error"); }
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('access_token')) {
        const loginSec = document.getElementById('login-section');
        const adminSec = document.getElementById('admin-section');
        
        if (loginSec) loginSec.style.display = 'none';
        if (adminSec) adminSec.style.display = 'block';
        
        loadContentList();
    }
});

function filterProjects() {
    const searchValue = document.getElementById('admin-search').value.toLowerCase();
    
    const cards = document.querySelectorAll('.edit-card');

    cards.forEach(card => {

        const titleInput = card.querySelector('input[id^="edit-title-"]');
        
        if (titleInput) {
            const titleText = titleInput.value.toLowerCase();
            
            if (titleText.includes(searchValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}
function initDragAndDropForEdit(id) {

    const zone = document.getElementById(`drop-zone-${id}`);
    const input = document.getElementById(`edit-file-${id}`);

    if (!zone || !input) return;

    ['dragenter', 'dragover'].forEach(name => {
        zone.addEventListener(name, (e) => { 
            e.preventDefault(); 
            zone.classList.add('drag-active'); 
        });
    });

    ['dragleave', 'drop'].forEach(name => {
        zone.addEventListener(name, (e) => { 
            e.preventDefault(); 
            zone.classList.remove('drag-active'); 
        });
    });

    zone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            input.files = files; 
            previewEditFiles(id); 
        }
    });
}

function previewEditFiles(id) {
    const input = document.getElementById(`edit-file-${id}`);
    const preview = document.getElementById(`preview-${id}`);
    
    if (!input || !preview) return;

    if (input.files.length > 0) {
        preview.innerHTML = '';
        [...input.files].forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('preview-item');
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

async function updateContentWithFiles(id) {
    // Отримуємо елементи
    const titleInput = document.getElementById(`edit-title-${id}`);
    const bodyInput = document.getElementById(`edit-body-${id}`);
    const fileInput = document.getElementById(`edit-file-${id}`);
    const token = localStorage.getItem('access_token');

    if (!titleInput || !bodyInput) {
        console.error(`Помилка: Не знайдено поля для ID ${id}. Перевірте назви ID в HTML.`);
        alert("Помилка: Елементи форми не знайдені.");
        return; 
    }

    let imageUrl = null;
    let additionalImages = null;

    try {
        if (fileInput && fileInput.files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < fileInput.files.length; i++) {
                formData.append("files", fileInput.files[i]);
            }

            const uploadRes = await fetch(`${API_URL}/upload-multiple`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (uploadRes.ok) {
                const urls = await uploadRes.json();
                imageUrl = urls[0];
                additionalImages = urls.slice(1).join(',');
            }
        }

        const updateData = {
            title: titleInput.value,
            body: bodyInput.value
        };

        if (imageUrl) {
            updateData.image_url = imageUrl;
            updateData.additional_images = additionalImages;
        }

        const response = await fetch(`${API_URL}/content/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            alert("Проєкт успішно оновлено!");
            location.reload();
        } else {
            const errorData = await response.json();
            alert("Помилка: " + (errorData.detail || "Невідома помилка"));
        }

    } catch (error) {
        console.error("Критична помилка при оновленні:", error);
    }
}

async function loadApplications() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/applications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const apps = await response.json();
            const tbody = document.getElementById('apps-tbody');
            
            tbody.innerHTML = apps.map(app => {
                const date = new Date(app.created_at).toLocaleString('uk-UA');
                return `
                    <tr>
                        <td>${date}</td>
                        <td>${app.user_name}</td>
                        <td><a href="tel:${app.user_phone}" style="color: #007bff;">${app.user_phone}</a></td>
                        <td>${app.service_type}</td>
                    </tr>
                `;
            }).join('');
        }
    } catch (e) {
        console.error("Не вдалося завантажити заявки", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('access_token')) {
        loadApplications();
        setInterval(loadApplications, 300000);
    }
});