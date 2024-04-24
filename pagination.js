export default async (model, page, perPage) => {
    page = page ? parseInt(page) : 1;
    let offset = (page-1) * perPage;
    let records = await model.findAll({offset, limit: perPage});
    let pages = Math.ceil(await model.count()/perPage);
    
    let elements = [];
    for(let i = 1; i<=3;i++){
        elements[i] = i;
    }
    if(page > 1) {
        elements.push('...');
    }
    
    for(let i = page-2; i<=page+2 && i<=pages;i++){
        elements[i] = i;
    }
    if(page < pages-2){
        elements.push('...');
    }
    
    for(let i = pages-2; i<=pages;i++){
        elements[i] = i;
    }
    elements = elements.filter(e => e);
    console.log(elements);
    let pagination = {
        total: pages,
        current: page,
        elements
    }
    return [records, pagination];
}