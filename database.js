const HARDWARE_DB = {
    placasMae: [
        { id: "b450", nome: "ASUS Prime B450M", soquete: "AM4", ddr: "DDR4", nvme: true, consumo: 50, preco: 550 },
        { id: "b650", nome: "Gigabyte B650M Gaminig", soquete: "AM5", ddr: "DDR5", nvme: true, consumo: 60, preco: 1100 },
        { id: "h610", nome: "MSI Pro H610M", soquete: "LGA1700", ddr: "DDR4", nvme: true, consumo: 50, preco: 600 },
        { id: "a320", nome: "ASRock A320M", soquete: "AM4", ddr: "DDR4", nvme: false, consumo: 45, preco: 380 }
    ],
    cpus: [
        { id: "r5_5600", nome: "AMD Ryzen 5 5600", soquete: "AM4", videoIntegrado: false, consumo: 65, preco: 850 },
        { id: "r5_4600g", nome: "AMD Ryzen 5 4600G", soquete: "AM4", videoIntegrado: true, desempenhoVideo: 30, consumo: 65, preco: 650 },
        { id: "r5_7600", nome: "AMD Ryzen 5 7600", soquete: "AM5", videoIntegrado: true, desempenhoVideo: 25, consumo: 65, preco: 1400 },
        { id: "i5_12400f", nome: "Intel Core i5-12400F", soquete: "LGA1700", videoIntegrado: false, consumo: 65, preco: 900 }
    ],
    gpus: [
        { id: "rtx4060", nome: "NVIDIA RTX 4060 8GB", forca: 100, consumo: 115, preco: 2100 },
        { id: "rx6600", nome: "AMD Radeon RX 6600 8GB", forca: 85, consumo: 132, preco: 1450 },
        { id: "rtx3050", nome: "NVIDIA RTX 3050 6GB", forca: 55, consumo: 75, preco: 1200 }
    ],
    memorias: [
        { id: "ddr4_8gb", nome: "HyperX Fury 8GB 3200MHz", ddr: "DDR4", preco: 180 },
        { id: "ddr4_16gb", nome: "Corsair Vengeance 16GB 3200MHz", ddr: "DDR4", preco: 340 },
        { id: "ddr5_16gb", nome: "Kingston Beast 16GB 5200MHz", ddr: "DDR5", preco: 480 }
    ],
    armazenamentos: [
        { id: "ssd_sata_480", nome: "SSD Kingston A400 480GB SATA", tipo: "SATA", preco: 220 },
        { id: "nvme_1tb", nome: "SSD Crucial P3 1TB NVMe M.2", tipo: "NVMe", preco: 450 },
        { id: "hd_1tb", nome: "HD WD Blue 1TB Sata III", tipo: "SATA", preco: 280 }
    ],
    fontes: [
        { id: "fonte_500", nome: "MSI MAG A500DN 500W", watts: 500, preco: 280 },
        { id: "fonte_650", nome: "Corsair CX650 650W", watts: 650, preco: 420 },
        { id: "fonte_750", nome: "XPG Pylon 750W", watts: 750, preco: 530 }
    ],
    gabinetes: [
        { id: "gab_mesh", nome: "Pichau Apus Black (Mesh)", preco: 200 },
        { id: "gab_aquario", nome: "Rise Mode Galaxy (Aquário)", preco: 350 }
    ],
    jogos: [
        { nome: "Counter-Strike 2", pesoGpu: 40, pesoCpu: 60 },
        { nome: "Cyberpunk 2077", pesoGpu: 90, pesoCpu: 40 },
        { nome: "GTA V", pesoGpu: 50, pesoCpu: 50 }
    ]
};