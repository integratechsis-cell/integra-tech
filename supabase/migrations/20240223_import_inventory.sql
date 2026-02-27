-- Migration to import inventory from Point Gamer list
-- Categories mapped to 'hardware' for components

INSERT INTO public.products (name, description, price, category, stock, image_url, is_active) VALUES
-- BOARDS
('BOARD GIGABYTE H610M H', 'Board Gigabyte H610M H DDR4 para procesadores Intel de 12va y 13ra generación.', 416100, 'hardware', 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('ASROCK AMD A520M-HDV', 'Board Asrock A520M-HDV para procesadores AMD Ryzen.', 391200, 'hardware', 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('BOARD BIOSTAR B450MH', 'Board Biostar B450MH socket AM4 para Ryzen.', 307800, 'hardware', 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('BOARD A520M-K', 'Board ASUS A520M-K Prime para AMD AM4.', 337200, 'hardware', 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('BOARD GIGABYTE B560M GAMING PLUS WIFI', 'Board Gigabyte B560M Gaming Plus con WiFi integrado.', 795600, 'hardware', 8, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('BOARD GIGABYTE B550M K', 'Board Gigabyte B550M K para AMD Ryzen serie 5000.', 733800, 'hardware', 8, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('ASROCK B660 PRO RS WIFI', 'Board Asrock B660 Pro RS con WiFi para Intel 12/13 Gen.', 740700, 'hardware', 5, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('ASROCK B550M-HDV/M.2', 'Board Asrock B550M-HDV con slot M.2.', 563700, 'hardware', 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('ASROCK B650M HDV M.2 WHITE', 'Board Asrock B650M HDV M.2 Edición Blanca.', 1035300, 'hardware', 5, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('GIGABYTE X570 GAMING X WIFI', 'Board Gigabyte X570 Gaming X con WiFi de alto rendimiento.', 1185000, 'hardware', 3, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),
('GIGABYTE B760M GAMING PLUS WIFI DDR4', 'Board Gigabyte B760M Gaming Plus WiFi soporte DDR4.', 646800, 'hardware', 6, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', true),

-- CHASIS
('ICEBERG TURBO Z10', 'Chasis Iceberg Turbo Z10 con excelente flujo de aire.', 324900, 'hardware', 10, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop', true),
('ICEBERG CRYSTAL G1 4 VENTILADORES', 'Chasis Iceberg Crystal G1 con 4 ventiladores ARGB y vidrio templado.', 373800, 'hardware', 8, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop', true),
('ICEBERG CRYSTAL G9 V3', 'Chasis Iceberg Crystal G9 V3 diseño premium.', 469800, 'hardware', 5, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop', true),
('ICEBERG FLOW D NEGRA', 'Chasis Iceberg Flow D Negra optimizado para refrigeración.', 459000, 'hardware', 6, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop', true),
('THERMALTAKE VIEW 170 TG ARGB', 'Chasis Thermaltake View 170 TG con ventiladores ARGB.', 963900, 'hardware', 4, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop', true),
('THERMALTAKE S200 TG ARGB SNOW', 'Chasis Thermaltake S200 TG ARGB Edición Snow (Blanco).', 548800, 'hardware', 5, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop', true),

-- DISCOS EXTERNOS
('DISCO EXTERNO 1 TERA TOSHIBA', 'Disco duro externo Toshiba Canvio 1TB USB 3.0.', 256500, 'hardware', 15, 'https://images.unsplash.com/photo-1531492244965-f76002ea9e1c?q=80&w=1000&auto=format&fit=crop', true),
('DISCO EXTERNO 2 TERAS TOSHIBA', 'Disco duro externo Toshiba Canvio 2TB USB 3.0.', 324900, 'hardware', 10, 'https://images.unsplash.com/photo-1531492244965-f76002ea9e1c?q=80&w=1000&auto=format&fit=crop', true),
('DISCO EXTERNO 4 TERA TOSHIBA', 'Disco duro externo Toshiba Canvio 4TB USB 3.0.', 529200, 'hardware', 5, 'https://images.unsplash.com/photo-1531492244965-f76002ea9e1c?q=80&w=1000&auto=format&fit=crop', true),
('DISCO EXTERNO 1 TERA SEAGATE', 'Disco duro externo Seagate Expansion 1TB.', 250800, 'hardware', 10, 'https://images.unsplash.com/photo-1531492244965-f76002ea9e1c?q=80&w=1000&auto=format&fit=crop', true),

-- DISCOS SOLIDOS M2 / SATA
('DISCO 1 TERA WD PURPURA PC', 'Disco duro WD Purple 1TB optimizado para vigilancia/PC.', 262200, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD LEXAR NM610 NVMe', 'Unidad de estado sólido Lexar NM610 M.2 NVMe.', 240900, 'hardware', 12, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD WD BLACK SN750 250 GB', 'SSD WD Black SN750 250GB NVMe de alto rendimiento.', 321300, 'hardware', 8, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD 512 GB NVME KINGSTON KC3000', 'SSD Kingston KC3000 512GB PCIe 4.0 NVMe.', 563100, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SOLIDO 500 KINGSTON NV2', 'SSD Kingston NV2 500GB PCIe 4.0 NVMe.', 227700, 'hardware', 20, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('PATRIOT P300 256GB', 'SSD Patriot P300 256GB M.2 PCIe.', 240900, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('PATRIOT P300 512GB', 'SSD Patriot P300 512GB M.2 PCIe.', 373800, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD TERA CRUCIAL T500', 'SSD Crucial T500 1TB PCIe Gen4 NVMe.', 849600, 'hardware', 5, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SOLIDO 500 KINGSTON NV3', 'SSD Kingston NV3 500GB PCIe 4.0 NVMe (Nueva Generación).', 321300, 'hardware', 15, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD M2 500GB SPATIUM NVME', 'SSD MSI Spatium M.2 500GB NVMe.', 367800, 'hardware', 8, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD CRUCIAL 480GB', 'SSD Crucial 480GB SATA 2.5.', 364800, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),

-- DISCOS SATA
('SSD 240 KINGSTON', 'SSD Kingston A400 240GB SATA.', 239400, 'hardware', 15, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD 500 CRUCIAL BX', 'SSD Crucial BX500 500GB SATA.', 453600, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD PATRIOT P210 512GB', 'SSD Patriot P210 512GB SATA.', 375300, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('DISCO 1 TERA PATRIOT SATA', 'SSD Patriot P210 1TB SATA.', 533400, 'hardware', 8, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD PATRIOT P210 128GB', 'SSD Patriot P210 128GB SATA.', 206700, 'hardware', 5, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD PATRIOT P210 256GB', 'SSD Patriot P210 256GB SATA.', 267300, 'hardware', 8, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD 1TB TEAM GROUP', 'SSD Team Group 1TB SATA.', 553400, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD 512GB TEAM GROUP', 'SSD Team Group 512GB SATA.', 353400, 'hardware', 10, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD CRUCIAL 2TB', 'SSD Crucial BX500 2TB SATA.', 913800, 'hardware', 5, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD LEXAR 512GB', 'SSD Lexar NS100 512GB SATA.', 337700, 'hardware', 8, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD VERBATIM 256GB', 'SSD Verbatim Vi550 256GB SATA.', 237700, 'hardware', 5, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD EXT CRUCIAL X6 1TB', 'SSD Externo Crucial X6 1TB Portátil.', 450000, 'hardware', 6, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),
('SSD EXT CRUCIAL X6 2TB', 'SSD Externo Crucial X6 2TB Portátil.', 798000, 'hardware', 4, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop', true),

-- FUENTES DE PODER
('FUENTE AZZA 650W 80+ BRONZE', 'Fuente de Poder Azza 650W certificación 80 Plus Bronze.', 250800, 'hardware', 10, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1000&auto=format&fit=crop', true),
('FUENTE AZZA 650W 80+ BRONZE RGB', 'Fuente de Poder Azza 650W 80 Plus Bronze con iluminación RGB.', 273600, 'hardware', 8, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1000&auto=format&fit=crop', true),
('FUENTE AZZA 750W 80+ BRONZE RGB', 'Fuente de Poder Azza 750W 80 Plus Bronze RGB.', 293600, 'hardware', 8, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1000&auto=format&fit=crop', true),
('FUENTE AZZA 750W 80+ BRONZE', 'Fuente de Poder Azza 750W 80 Plus Bronze.', 342000, 'hardware', 5, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1000&auto=format&fit=crop', true),

-- MEMORIAS
('RAM 8GB BEAST FURY RGB 3200', 'Memoria RAM Kingston Fury Beast RGB 8GB 3200MHz DDR4.', 250800, 'hardware', 20, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 8GB TEAM GROUP ELITE 3200', 'Memoria RAM Team Group Elite 8GB 3200MHz DDR4.', 195000, 'hardware', 15, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 8GB KINGSTON FURY BEAST 3200', 'Memoria RAM Kingston Fury Beast 8GB 3200MHz DDR4.', 245000, 'hardware', 20, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM PATRIOT DDR5 VIPER VENOM 32GB', 'Kit RAM Patriot Viper Venom RGB DDR5 32GB (2x16GB) 6000MT/s.', 1050000, 'hardware', 5, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM PATRIOT DDR5 VIPER VENOM 64GB', 'Kit RAM Patriot Viper Venom RGB DDR5 64GB (2x32GB) 6000MT/s.', 1920000, 'hardware', 3, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 8GB CRUCIAL 2666', 'Memoria RAM Crucial 8GB 2666MHz DDR4.', 245000, 'hardware', 10, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 16GB KINGSTON PORTATIL DDR4L', 'Memoria RAM para Portátil Kingston 16GB DDR4L 2666MHz.', 293600, 'hardware', 10, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 16GB KINGSTON FURY DDR5 RGB', 'Memoria RAM Kingston Fury DDR5 RGB 16GB 5600MHz.', 469800, 'hardware', 8, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 32GB PATRIOT VIPER 5600', 'Memoria RAM Patriot Viper DDR5 32GB 5600MHz.', 1946400, 'hardware', 4, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 16GB PATRIOT 5600', 'Memoria RAM Patriot Viper DDR5 16GB 5600MHz.', 1058400, 'hardware', 6, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 16GB PATRIOT 6000 RGB', 'Memoria RAM Patriot Viper RGB DDR5 16GB 6000MHz.', 665000, 'hardware', 6, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true),
('RAM 32GB PATRIOT VIPER 6000 RGB', 'Memoria RAM Patriot Viper RGB DDR5 32GB 6000MHz.', 1653000, 'hardware', 4, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop', true);
