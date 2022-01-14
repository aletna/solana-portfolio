export const numWithCommas = (num: number | string) => {
    if (typeof num == "string"){
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')    
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const imgHostSupport = (url: string) => {
    const hosts = ["raw.githubusercontent.com","cdn.jsdelivr.net"]
    let supported = false
    for (const host of hosts){
        if (url.includes(host)) {
            supported = true
        }
    }
    return supported
}