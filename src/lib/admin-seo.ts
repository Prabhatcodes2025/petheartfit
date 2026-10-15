const hiddenAdminSeoPaths=new Set([
 '/packages/premium-dog-walking-package',
 '/packages/kitten-training'
])

export const isAdminSeoVisible=(row:Record<string,unknown>)=>!hiddenAdminSeoPaths.has(String(row.page_key||''))
