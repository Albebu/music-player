import LogoSebs from '../assets/Logo-Sebs.png'

const Controls = () => {
    return(
        <section className="flex flex-row justify-between fixed bottom-0 left-0 w-screen bg-black text-white">
            <div className="flex flex-row">
                <div>
                    <img className="w-28" src={LogoSebs} alt="Logo Sebs" />
                </div>
                <div>
                    <h4>Cancion</h4>
                    <p>Artista</p>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row'>
                    <p>Aleatorio</p>
                    <p>Atras</p>
                    <p>Pausar</p>
                    <p>Adelante</p>
                    <p>Loop</p>
                </div>
                <div className='self-center'>
                    <p>Barra reproducción</p>
                </div>
            </div>
            <div className='flex flex-row'>
                <p>Lyrics</p>
                <p>Cola</p>
                <p>Volumen</p>
            </div>
        </section>
    );
}

export default Controls;