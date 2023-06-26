import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useMemo } from "react";
import teamsRaw from "~/data/temporal_rift.json";
import { cn } from "~/utils/styles";

type Team = {
  pos1: string;
  pos2: string;
  pos3: string;
  pos4: string;
  pos5: string;
  pet: string;
  badge: string;
};

type TeamProps = {
  team: Team;
  usedHeroes: string[];
  usedPets: string[];
  usedBadges: string[];
  checkUsed: boolean;
  selected: boolean;
  onClick: () => void;
};

const heroMapping: Record<string, string> = {
  Edwin: "adwin",
  Eorin: "alen",
  "Awakened Brutus": "slk",
  Astar: "flamee",
  Tamrus: "tsl",
  Thali: "crazyfox",
  Haelus: "artisan",
  Ezizh: "bane",
  "Joan of Arc": "joa",
  Albedo: "yalbed",
  Silas: "udd",
  Frampton: "fp",
  Mortas: "gd",
  "Ainz Ooal Gown": "anz",
  Rem: "rm",
  Mulan: "hml",
  Veithael: "mars",
  Scarlet: "bm",
  Kren: "techmouse",
  Anasta: "orcmaster",
  Yennifer: "ynf",
  Geralt: "gor",
  Skreg: "mag",
  Talene: "phoenix",
  "Elijah & Lilah": "twinsb",
  Desira: "siren",
  Alna: "winterl",
  Grezhul: "dk",
  Oden: "mystic",
  Ferael: "bonearcher",
  Mishka: "bdruid",
  Lorsan: "bunnymaster",
  Tarnos: "patronus",
  Leonardo: "ldv",
  Skriath: "wildkin",
  "Awakened Talene": "sphoenix",
  "Awakened Athalia": "divineblade",
  "Canissa & Ruke": "chimera",
  Nevanthi: "flora",
  Flora: "spring",
  Sonja: "sonia",
  Pippa: "ssr",
  Peggy: "princess",
  Rosaline: "maid",
  Rowan: "merchant",
  Raku: "tricracoon",
  "Awakened Solise": "wnt",
  Emilia: "emt",
  Palmer: "bishop",
  "Awakened Belinda": "hfp",
  Raine: "nbh",
  Zolrath: "dt",
  Lyca: "pom",
  Maetria: "bsparrow",
  "Awakened Baden": "sbd",
  "Awakened Thane": "windsm",
  Khazard: "iced",
  Olgath: "doa",
  Hodgkin: "captain",
  Daimon: "dkid",
};

const badgeMapping: Record<string, string> = {
  "Boulder Armor": "armor",
  "Cloud of Tempest": "cloud",
  "Axe of Fury": "axe",
  "Dagger of Disaster": "dagger",
  "Ring of Dominion": "ring",
  "Frosty Trap": "frosty",
  "Meteoric Rise": "meteor",
  "Sweeping Tide": "tide",
};

const petMapping: Record<string, string> = {
  Bellbellow: "pet_6010",
  "Grassy Orb": "pet_6003",
  "Tufty Ears": "pet_6002",
  "Slumber Seal": "pet_6015",
  Talismane: "pet_6012",
  "Flutterplume Owl": "pet_6011",
  "Feline Vesperio": "pet_6009",
  "Rock Crown Lizard": "pet_6006",
  "Blade Ridge": "pet_6008",
  "Savage Souffle": "pet_6014",
  "Winged Lion": "pet_6007",
  Phantasmoth: "pet_6013",
};

function getHeroImage(hero: string) {
  if (heroMapping[hero]) {
    hero = heroMapping[hero] ?? hero;
  }
  return `/heroes/${hero}.jpg`;
}

function getBadgeImage(badge: string) {
  if (badgeMapping[badge]) {
    badge = badgeMapping[badge] ?? badge;
  }
  return `/badges/${badge}.png`;
}

function getPetImage(pet: string) {
  if (petMapping[pet]) {
    pet = petMapping[pet] ?? pet;
  }
  return `/pets/${pet}.png`;
}

const Hero: React.FC<{ hero: string; used: boolean }> = (props) => {
  const heroName = useMemo(() => {
    if (props.hero.includes("[sp]")) {
      return props.hero.replace(/ ?\[sp\]/g, "");
    }
    return props.hero;
  }, [props.hero]);

  return (
    <div className={cn("bg-slate-800", { grayscale: props.used })}>
      <Image
        src={getHeroImage(heroName)}
        className="h-16 w-16"
        alt={props.hero}
        title={props.hero}
        width={100}
        height={100}
      />
    </div>
  );
};

const Badge: React.FC<{ badge: string; used: boolean }> = (props) => {
  return (
    <div className={cn("bg-slate-800", { grayscale: props.used })}>
      <Image
        src={getBadgeImage(props.badge)}
        className="h-16 w-16"
        alt={props.badge}
        title={props.badge}
        width={100}
        height={100}
      />
    </div>
  );
};

const Pet: React.FC<{ pet: string; used: boolean }> = (props) => {
  return (
    <div className={cn("bg-slate-800", { grayscale: props.used })}>
      <Image
        src={getPetImage(props.pet)}
        className="h-16 w-16"
        alt={props.pet}
        title={props.pet}
        width={100}
        height={100}
      />
    </div>
  );
};

const Team: React.FC<TeamProps> = (props) => {
  const heroes = useMemo(() => {
    return [
      props.team.pos1,
      props.team.pos2,
      props.team.pos3,
      props.team.pos4,
      props.team.pos5,
    ];
  }, [props.team]);

  const isUsedAlready = useMemo(() => {
    if (!props.checkUsed) {
      return false;
    }
    return (
      props.usedHeroes.includes(props.team.pos1) ||
      props.usedHeroes.includes(props.team.pos2) ||
      props.usedHeroes.includes(props.team.pos3) ||
      props.usedHeroes.includes(props.team.pos4) ||
      props.usedHeroes.includes(props.team.pos5) ||
      props.usedPets.includes(props.team.pet) ||
      props.usedBadges.includes(props.team.badge)
    );
  }, [props]);

  return (
    <div
      className={cn("flex gap-1 rounded-lg border-2 bg-slate-900 p-1", {
        "border-yellow-300": props.selected,
        "cursor-pointer": !isUsedAlready,
        "border-gray-700": isUsedAlready,
      })}
      onClick={() => {
        if (isUsedAlready) {
          return;
        }
        props.onClick();
      }}
    >
      {heroes.map((hero, i) => {
        return (
          <Hero
            key={i}
            hero={hero}
            used={props.checkUsed && props.usedHeroes.includes(hero)}
          />
        );
      })}
      <Pet
        pet={props.team.pet}
        used={props.checkUsed && props.usedPets.includes(props.team.pet)}
      />
      <Badge
        badge={props.team.badge}
        used={props.checkUsed && props.usedBadges.includes(props.team.badge)}
      />
    </div>
  );
};

export default function Home() {
  const [selected, setSelected] = React.useState<number[]>([]);

  const usedHeroes = useMemo(() => {
    return selected
      .flatMap((i) => {
        if (!teamsRaw[i]) {
          return [];
        }
        return [
          teamsRaw[i]?.pos1,
          teamsRaw[i]?.pos2,
          teamsRaw[i]?.pos3,
          teamsRaw[i]?.pos4,
          teamsRaw[i]?.pos5,
        ];
      })
      .filter((i) => i)
      .map((i) => i as string);
  }, [selected]);

  const usedPets = useMemo(() => {
    return selected
      .flatMap((i) => {
        if (!teamsRaw[i]) {
          return [];
        }
        return [teamsRaw[i]?.pet];
      })
      .filter((i) => i)
      .map((i) => i as string);
  }, [selected]);

  const usedBadges = useMemo(() => {
    return selected
      .flatMap((i) => {
        if (!teamsRaw[i]) {
          return [];
        }
        return [teamsRaw[i]?.badge];
      })
      .filter((i) => i)
      .map((i) => i as string);
  }, [selected]);

  const teams = useMemo(() => {
    const copy = teamsRaw.map((team, i) => {
      return [team, i];
    }) as [Team, number][];
    copy.sort((a, b) => {
      const [aTeam, ai] = a;
      const [bTeam, bi] = b;
      if (selected.includes(ai) && selected.includes(bi)) {
        return ai - bi;
      }
      if (selected.includes(ai)) {
        return -1;
      }
      if (selected.includes(bi)) {
        return 1;
      }
      let aUsedcount = 0;
      let bUsedcount = 0;
      if (usedHeroes.includes(aTeam.pos1)) {
        aUsedcount++;
      }
      if (usedHeroes.includes(aTeam.pos2)) {
        aUsedcount++;
      }
      if (usedHeroes.includes(aTeam.pos3)) {
        aUsedcount++;
      }
      if (usedHeroes.includes(aTeam.pos4)) {
        aUsedcount++;
      }
      if (usedHeroes.includes(aTeam.pos5)) {
        aUsedcount++;
      }
      if (usedPets.includes(aTeam.pet)) {
        aUsedcount++;
      }
      if (usedBadges.includes(aTeam.badge)) {
        aUsedcount++;
      }
      if (usedHeroes.includes(bTeam.pos1)) {
        bUsedcount++;
      }
      if (usedHeroes.includes(bTeam.pos2)) {
        bUsedcount++;
      }
      if (usedHeroes.includes(bTeam.pos3)) {
        bUsedcount++;
      }
      if (usedHeroes.includes(bTeam.pos4)) {
        bUsedcount++;
      }
      if (usedHeroes.includes(bTeam.pos5)) {
        bUsedcount++;
      }
      if (usedPets.includes(bTeam.pet)) {
        bUsedcount++;
      }
      if (usedBadges.includes(bTeam.badge)) {
        bUsedcount++;
      }
      if (aUsedcount === bUsedcount) {
        return ai - bi;
      }
      return aUsedcount - bUsedcount;
    });
    return copy;
  }, [selected, usedBadges, usedHeroes, usedPets]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-500">
        <div className="container flex flex-col items-center justify-center px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Temporal Rift Teams
          </h1>
          <div className="p-3 text-white">
            Sourced from:
            <a
              className="pl-1 text-white underline"
              href="https://docs.google.com/spreadsheets/d/18es-wVI6NS30O8RIyP_Ujep_s5OJkG80watnE6v8sYM/edit#gid=376927090"
              target="_blank"
            >
              New Rift Teams Compiled
            </a>
          </div>
          <div className="flex max-h-[80vh] gap-10 overflow-auto p-2">
            <div className="flex flex-col gap-1">
              <div className="flex w-[484px] justify-center text-white">
                Recommended Teams
              </div>
              {teams.map(([team, i]) => {
                return (
                  <Team
                    key={i}
                    team={team}
                    usedBadges={usedBadges}
                    usedHeroes={usedHeroes}
                    usedPets={usedPets}
                    checkUsed={!selected.includes(i)}
                    selected={selected.includes(i)}
                    onClick={() => {
                      if (selected.includes(i)) {
                        setSelected(selected.filter((x) => x !== i));
                      } else {
                        setSelected([...selected, i]);
                      }
                    }}
                  ></Team>
                );
              })}
            </div>
            <div className="sticky top-0 flex flex-col gap-1">
              <div className="flex w-[484px] justify-center text-white">
                Selected
              </div>
              {teams
                .filter(([_, i]) => {
                  return selected.includes(i);
                })
                .map(([team, i]) => {
                  return (
                    <Team
                      key={i}
                      team={team}
                      usedBadges={usedBadges}
                      usedHeroes={usedHeroes}
                      usedPets={usedPets}
                      checkUsed={false}
                      selected={true}
                      onClick={() => {
                        setSelected(selected.filter((x) => x !== i));
                      }}
                    ></Team>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
