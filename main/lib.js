export async function init_project_name_menu() {
    const project_id = get_url_params().project_id;
    const project = await ajax_get('/project/info', { project_id: project_id });
    el('#menu-project_name').innerHTML = project.name;
    el('#menu-project_name').style.display = 'block';
    for (const item of ['products', 'tasks', 'procs', 'map']) {
        const menu_item = el('#menu-' + item);
        menu_item.style.display = 'block';
        menu_item.href = menu_item.href.replace('{project_id}', project_id);
    }
    return project;
}
