export const getusuarioStorage = () => {
    return {
        agente: localStorage.getItem('agente') || null,
        escritorio: localStorage.getItem('escritorio') || null
    }
}