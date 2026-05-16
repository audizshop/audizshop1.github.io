const CATEGORIES = [
  { id: "audifonos", name: "Audifonos", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80" },
  { id: "consolas-videojuegos", name: "Consolas", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80" },
  { id: "bocinas-portatiles", name: "Bocinas portatiles", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80" },
  { id: "bocinas-inteligentes", name: "Bocinas inteligentes", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80" },
  { id: "accesorios-consola", name: "Accesorios de consola", image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=900&q=80" },
  { id: "baterias-portatiles", name: "Baterias portatiles", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80" },
  { id: "juguetes-control-remoto", name: "Control remoto", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=900&q=80" },
  { id: "redes-router-mesh", name: "Router mesh", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=80" }
];

const PRODUCTS = [
  {
    id: "beats-studio-pro",
    name: "Beats Studio Pro",
    category: "audifonos",
    price: 220,
    condition: "Nuevo",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1100&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1100&q=82",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1100&q=82"
    ],
    description: "Audifonos premium con cancelacion de ruido, sonido potente y diseno comodo para uso diario.",
    features: ["Cancelacion activa de ruido", "Modo transparencia", "Audio espacial compatible", "Bateria de larga duracion"],
    includes: ["Audifonos", "Estuche", "Cable de carga", "Cable de audio"]
  },
  {
    id: "playstation-4-liberada",
    name: "PlayStation 4 liberada",
    category: "consolas-videojuegos",
    price: 220,
    condition: "Usado",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1100&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1100&q=82",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1100&q=82"
    ],
    description: "Consola PlayStation 4 liberada, lista para jugar y disfrutar una amplia biblioteca de titulos.",
    features: ["Sistema liberado", "Ideal para gaming familiar", "Salida HDMI", "Almacenamiento interno"],
    includes: ["Consola", "Control", "Cable HDMI", "Cable de corriente"]
  },
  {
    id: "google-home",
    name: "Google Home",
    category: "bocinas-inteligentes",
    price: 25,
    condition: "Usado",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1100&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1100&q=82",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=1100&q=82"
    ],
    description: "Bocina inteligente con Asistente de Google para musica, consultas, alarmas y control del hogar.",
    features: ["Asistente de Google", "Control por voz", "Wi-Fi", "Compatible con smart home"],
    includes: ["Bocina", "Adaptador de corriente"]
  },
  {
    id: "google-nest-hub-2",
    name: "Google Nest Hub 2nd Gen",
    category: "bocinas-inteligentes",
    price: 70,
    condition: "Nuevo",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=1100&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=1100&q=82",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1100&q=82"
    ],
    description: "Pantalla inteligente para controlar musica, rutinas, camaras compatibles y calendario desde un solo lugar.",
    features: ["Pantalla tactil", "Asistente integrado", "Control de hogar", "Ideal para cocina o dormitorio"],
    includes: ["Nest Hub", "Adaptador de corriente", "Guia rapida"]
  },
  {
    id: "bocina-bluetooth-compacta",
    name: "Bocina Bluetooth compacta",
    category: "bocinas-portatiles",
    price: 35,
    condition: "Nuevo",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1100&q=82",
    gallery: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1100&q=82"],
    description: "Bocina portatil con buen volumen para cuarto, oficina o salidas pequenas.",
    features: ["Bluetooth", "Bateria recargable", "Diseno compacto", "Controles fisicos"],
    includes: ["Bocina", "Cable USB"]
  },
  {
    id: "control-inalambrico-ps4",
    name: "Control inalambrico PS4",
    category: "accesorios-consola",
    price: 38,
    condition: "Nuevo",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1100&q=82",
    gallery: ["https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1100&q=82"],
    description: "Control compatible para PlayStation 4, ideal como control adicional o reemplazo.",
    features: ["Conexion inalambrica", "Vibracion", "Touchpad", "Bateria recargable"],
    includes: ["Control", "Cable de carga"]
  },
  {
    id: "power-bank-20000",
    name: "Power Bank 20000 mAh",
    category: "baterias-portatiles",
    price: 32,
    condition: "Nuevo",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1100&q=82",
    gallery: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1100&q=82"],
    description: "Bateria portatil para mantener telefono, audifonos y accesorios cargados durante el dia.",
    features: ["20000 mAh", "Doble salida USB", "Indicador LED", "Proteccion de carga"],
    includes: ["Power bank", "Cable USB"]
  },
  {
    id: "carro-rc-4x4",
    name: "Carro RC 4x4",
    category: "juguetes-control-remoto",
    price: 55,
    condition: "Nuevo",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1100&q=82",
    gallery: ["https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1100&q=82"],
    description: "Juguete a control remoto para interiores y exteriores ligeros.",
    features: ["Traccion 4x4", "Control remoto", "Bateria recargable", "Suspension flexible"],
    includes: ["Carro RC", "Control", "Bateria", "Cable de carga"]
  },
  {
    id: "router-mesh-duo",
    name: "Router Mesh Duo",
    category: "redes-router-mesh",
    price: 95,
    condition: "Nuevo",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=1100&q=82",
    gallery: ["https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=1100&q=82"],
    description: "Sistema mesh para mejorar cobertura Wi-Fi en casa u oficina pequena.",
    features: ["Cobertura extendida", "Doble banda", "App de configuracion", "Roaming entre nodos"],
    includes: ["2 nodos mesh", "Adaptadores", "Cable Ethernet"]
  }
];
