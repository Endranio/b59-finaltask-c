function one(){
    const totalModal = 1000000000 //total uang
    const depositoBank = 350000000 
    const obligasiNegara = 650000000 * 0.30
    const sahamA = 650000000 *0.35
    const sahamB = 650000000 * 0.35

    const depositoProfit = 0.035
    const obligasiProfit = 0.13
    const Aprofit = 0.145
    const Bprofit = 0.125

    const deposito2Tahun = depositoBank * Math.pow(1+depositoProfit,2) 
    const obligasi2Tahun = obligasiNegara * Math.pow(1+obligasiProfit,2)
    const sahamA2Tahun = sahamA * Math.pow(1+Aprofit,2)
    const sahamB2Tahun = sahamB * Math.pow (1+Bprofit,2)

    const totalUangYgDimilikiSetelah2Tahun = deposito2Tahun + obligasi2Tahun + sahamA2Tahun + sahamB2Tahun
    const totalUangYgDihasilkanSetelah2Tahun = totalUangYgDimilikiSetelah2Tahun - totalModal

    console.log("profit:",totalUangYgDihasilkanSetelah2Tahun)
    console.log("capital:",totalUangYgDimilikiSetelah2Tahun)
}

one()