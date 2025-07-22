//pagina principal

function Home() {
  return (
    <div className="home-banner text-center">
      <h1 className="home-title">Bienvenidos a la Clínica Veterinaria CatDog </h1>
      <img
        src="/images/7.png"
        alt="CatDog Banner"
        style={{ maxWidth: "80%", height: "auto", borderRadius: "50px"}}
      />
    </div>
  );
}

export default Home;
