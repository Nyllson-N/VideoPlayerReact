import { Navigation } from "../Componentes/Navigation";

const list = [
  {
    name: "Kaijuu 8-gou 2nd Season",
    img: "https://animefire.plus/img/animes/kaijuu-8-gou-2nd-season.webp",
    year: 2024,
    type: "Legendado"
  },
  {
    name: "Jujutsu Kaisen",
    img: "https://sushianimes.com.br/public/upload/cover/jujutsu-kaisen.webp",
    year: 2020,
    type: "Legendado"
  },
  {
    name: "One Piece",
    img: "https://cdn.animefire.plus/animes/one-piece.jpg",
    yea7r: 1999,
    type: "Legendado"
  },
  {
    name: "Naruto",
    img: "https://animefire.plus/animes/naruto.webp",
    year: 2002,
    type: "Legendado"
  },
  {
    name: "Attack on Titan",
    img: "https://cdn.animefire.plus/animes/shingeki-no-kyojin.jpg",
    year: 2013,
    type: "Legendado"
  },
  {
    name: "Black Clover",
    img: "https://cdn.animefire.plus/animes/black-clover.jpg",
    year: 2017,
    type: "Legendado"
  },
  {
    name: "Solo Leveling",
    img: "https://cdn.animefire.plus/animes/solo-leveling.jpg",
    year: 2024,
    type: "Legendado"
  },
  {
    name: "Spy x Family",
    img: "https://cdn.animefire.plus/animes/spy-x-family.jpg",
    year: 2022,
    type: "Legendado"
  },
  {
    name: "Chainsaw Man",
    img: "https://cdn.animefire.plus/animes/chainsaw-man.jpg",
    year: 2022,
    type: "Legendado"
  },
  {
    name: "Boku no Hero Academia",
    img: "https://cdn.animefire.plus/animes/boku-no-hero-academia.jpg",
    year: 2016,
    type: "Legendado"
  },
  {
    name: "Tokyo Revengers",
    img: "https://cdn.animefire.plus/animes/tokyo-revengers.jpg",
    year: 2021,
    type: "Legendado"
  },
  {
    name: "Dr. Stone",
    img: "https://cdn.animefire.plus/animes/dr-stone.jpg",
    year: 2019,
    type: "Legendado"
  },
  {
    name: "Dandadan",
    img: "https://cdn.animefire.plus/animes/dandadan.jpg",
    year: 2024,
    type: "Legendado"
  },
  {
    name: "Mushoku Tensei",
    img: "https://cdn.animefire.plus/animes/mushoku-tensei.jpg",
    year: 2021,
    type: "Legendado"
  },
  {
    name: "Frieren",
    img: "https://cdn.animefire.plus/animes/frieren.jpg",
    year: 2023,
    type: "Legendado"
  },
  {
    name: "Blue Lock",
    img: "https://cdn.animefire.plus/animes/blue-lock.jpg",
    year: 2022,
    type: "Legendado"
  },
  {
    name: "Oshi no Ko",
    img: "https://cdn.animefire.plus/animes/oshi-no-ko.jpg",
    year: 2023,
    type: "Legendado"
  },
  {
    name: "Re:Zero",
    img: "https://cdn.animefire.plus/animes/re-zero.jpg",
    year: 2016,
    type: "Legendado"
  },
  {
    name: "Death Note",
    img: "https://cdn.animefire.plus/animes/death-note.jpg",
    year: 2006,
    type: "Legendado"
  },
  {
    name: "Fullmetal Alchemist: Brotherhood",
    img: "https://cdn.animefire.plus/animes/fullmetal-alchemist-brotherhood.jpg",
    year: 2009,
    type: "Legendado"
  },
  {
    name: "Dragon Ball Super",
    img: "https://cdn.animefire.plus/animes/dragon-ball-super.jpg",
    year: 2015,
    type: "Legendado"
  },
  {
    name: "Bleach",
    img: "https://cdn.animefire.plus/animes/bleach.jpg",
    year: 2004,
    type: "Legendado"
  },
  {
    name: "Fairy Tail",
    img: "https://cdn.animefire.plus/animes/fairy-tail.jpg",
    year: 2009,
    type: "Legendado"
  },
  {
    name: "Sword Art Online",
    img: "https://cdn.animefire.plus/animes/sword-art-online.jpg",
    year: 2012,
    type: "Legendado"
  },
  {
    name: "Demon Slayer: Mugen Train",
    img: "https://cdn.animefire.plus/animes/kimetsu-no-yaiba-mugen-train.jpg",
    year: 2020,
    type: "Legendado"
  },
  {
    name: "Mob Psycho 100",
    img: "https://cdn.animefire.plus/animes/mob-psycho-100.jpg",
    year: 2016,
    type: "Legendado"
  },
  {
    name: "Noragami",
    img: "https://cdn.animefire.plus/animes/noragami.jpg",
    year: 2014,
    type: "Legendado"
  },
  {
    name: "Haikyuu!!",
    img: "https://cdn.animefire.plus/animes/haikyuu.jpg",
    year: 2014,
    type: "Legendado"
  },
  {
    name: "Kaguya-sama: Love is War",
    img: "https://cdn.animefire.plus/animes/kaguya-sama-love-is-war.jpg",
    year: 2019,
    type: "Legendado"
  },
  {
    name: "Nanatsu no Taizai",
    img: "https://cdn.animefire.plus/animes/nanatsu-no-taizai.jpg",
    year: 2014,
    type: "Legendado"
  },
  {
    name: "Hunter x Hunter",
    img: "https://cdn.animefire.plus/animes/hunter-x-hunter.jpg",
    year: 2011,
    type: "Legendado"
  },
  {
    name: "Overlord",
    img: "https://cdn.animefire.plus/animes/overlord.jpg",
    year: 2015,
    type: "Legendado"
  },
  {
    name: "Tate no Yuusha no Nariagari",
    img: "https://cdn.animefire.plus/animes/tate-no-yuusha-no-nariagari.jpg",
    year: 2019,
    type: "Legendado"
  },
  {
    name: "No Game No Life",
    img: "https://cdn.animefire.plus/animes/no-game-no-life.jpg",
    year: 2014,
    type: "Legendado"
  },
  {
    name: "Kuroko no Basket",
    img: "https://cdn.animefire.plus/animes/kuroko-no-basket.jpg",
    year: 2012,
    type: "Legendado"
  },
  {
    name: "Yuru Camp",
    img: "https://cdn.animefire.plus/animes/yuru-camp.jpg",
    year: 2018,
    type: "Legendado"
  },
  {
    name: "Made in Abyss",
    img: "https://cdn.animefire.plus/animes/made-in-abyss.jpg",
    year: 2017,
    type: "Legendado"
  },
  {
    name: "Horimiya",
    img: "https://cdn.animefire.plus/animes/horimiya.jpg",
    year: 2021,
    type: "Legendado"
  },
  {
    name: "Violet Evergarden",
    img: "https://cdn.animefire.plus/animes/violet-evergarden.jpg",
    year: 2018,
    type: "Legendado"
  },
  {
    name: "Yakusoku no Neverland",
    img: "https://cdn.animefire.plus/animes/yakusoku-no-neverland.jpg",
    year: 2019,
    type: "Legendado"
  },
  {
    name: "Shokugeki no Soma",
    img: "https://cdn.animefire.plus/animes/shokugeki-no-soma.jpg",
    year: 2015,
    type: "Legendado"
  },
  {
    name: "Komi-san wa, Comyushou desu.",
    img: "https://cdn.animefire.plus/animes/komi-san-wa-comyushou-desu.jpg",
    year: 2021,
    type: "Legendado"
  },
  {
    name: "Ao Ashi",
    img: "https://cdn.animefire.plus/animes/ao-ashi.jpg",
    year: 2022,
    type: "Legendado"
  },
  {
    name: "Hells Paradise",
    img: "https://cdn.animefire.plus/animes/hells-paradise.jpg",
    year: 2023,
    type: "Legendado"
  },
  {
    name: "To Your Eternity",
    img: "https://cdn.animefire.plus/animes/to-your-eternity.jpg",
    year: 2021,
    type: "Legendado"
  },
  {
    name: "Summertime Render",
    img: "https://cdn.animefire.plus/animes/summertime-render.jpg",
    year: 2022,
    type: "Legendado"
  },
  {
    name: "Edens Zero",
    img: "https://cdn.animefire.plus/animes/edens-zero.jpg",
    year: 2021,
    type: "Legendado"
  },
  {
    name: "Rent-a-Girlfriend",
    img: "https://cdn.animefire.plus/animes/rent-a-girlfriend.jpg",
    year: 2020,
    type: "Legendado"
  },
  {
    name: "Uzaki-chan wa Asobitai!",
    img: "https://cdn.animefire.plus/animes/uzaki-chan-wa-asobitai.jpg",
    year: 2020,
    type: "Legendado"
  },
  {
    name: "Kobayashi-san Chi no Maid Dragon",
    img: "https://cdn.animefire.plus/animes/kobayashi-san-chi-no-maid-dragon.jpg",
    year: 2017,
    type: "Legendado"
  },
  {
    name: "Hataraku Maou-sama!",
    img: "https://cdn.animefire.plus/animes/hataraku-maou-sama.jpg",
    year: 2013,
    type: "Legendado"
  }
];


export function Home() {
  return (
    <>
      <Navigation />
      <style>
        {`
          .anime-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 24px;
          }
          @media (max-width: 900px) {
            .anime-grid {
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 16px;
            }
          }
          @media (max-width: 600px) {
            .anime-grid {
              grid-template-columns: 1fr;
              gap: 12px;
            }
            .anime-card img {
              height: 140px;
            }
            .anime-card {
              border-radius: 8px;
            }
          }
        `}
      </style>
      <div style={{
        background: "#f9f9f9",
        minHeight: "100vh",
        padding: "0 8px"
      }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          paddingTop: 24
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: 24
          }}>
            Recomendados
          </h2>
          <div className="anime-grid">
            {list.map((anime) => (
              <div key={anime.name} className="anime-card" style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                display: "flex",
                flexDirection: "column"
              }}>
                <img
                  src={anime.img}
                  alt={anime.name}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover"
                  }}
                />
                <div style={{ padding: "16px 12px", flex: 1 }}>
                  <div style={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    marginBottom: 8,
                    color: "#222"
                  }}>
                    {anime.name}
                  </div>
                  <div style={{
                    fontSize: "0.95rem",
                    color: "#666"
                  }}>
                    {anime.year} • {anime.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}