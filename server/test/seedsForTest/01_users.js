exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          first_name: "Masuo",
          last_name: "Suzuki",
          email: "masuo@suzuki.com",
          phone: "080-782-1819",
        },
        {
          first_name: "Aiko",
          last_name: "Mochizuki",
          email: "aiko@mochizuki.com",
          phone: "080-332-1611",
        },
        {
          first_name: "Akiko",
          last_name: "Tanaka",
          email: "akiko@tanaka.com",
          phone: "080-222-0392",
        },
        {
          first_name: "Atsuo",
          last_name: "Watanabe",
          email: "atsuo@watanabe.com",
          phone: "090-323-444",
        },
        {
          first_name: "Akio",
          last_name: "Ito",
          email: "akio@ito.com",
          phone: "090-7777-7777",
        },
        {
          first_name: "Chie",
          last_name: "Yoshida",
          email: "chie@yoshida.com",
          phone: "080-7382-1819",
        },
        {
          first_name: "Kimiko",
          last_name: "Sasaki",
          email: "kimiko@sasaki.com",
          phone: "080-3332-1611",
        },
        {
          first_name: "Hide",
          last_name: "Kimura",
          email: "hide@kimura.com",
          phone: "080-2202-0392",
        },
        {
          first_name: "Hiro",
          last_name: "Hayashi",
          email: "hiro@hayashi.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Haruka",
          last_name: "Matsumoto",
          email: "haruka@matsumoto.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Kaori",
          last_name: "Fujita",
          email: "kaori@fujita.com",
          phone: "080-7382-1819",
        },
        {
          first_name: "Kazuto",
          last_name: "Goto",
          email: "kazuto@goto.com",
          phone: "080-332-1611",
        },
        {
          first_name: "Koji",
          last_name: "Ogawa",
          email: "koji@ogawa.com",
          phone: "080-222-0392",
        },
        {
          first_name: "Kimi",
          last_name: "Shimada",
          email: "kimi@shimada.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Hitomi",
          last_name: "Aoki",
          email: "hitomi@aoki.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Kazuya",
          last_name: "Nishimura",
          email: "kazuya@nishimura.com",
          phone: "080-782-1819",
        },
        {
          first_name: "Kenji",
          last_name: "Fukuda",
          email: "kenji@fukuda.com",
          phone: "080-332-1611",
        },
        {
          first_name: "Maki",
          last_name: "Kimura",
          email: "maki@kimura.com",
          phone: "080-202-0392",
        },
        {
          first_name: "Matsu",
          last_name: "Shimizu",
          email: "matsu@shimizu.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Mai",
          last_name: "Abe",
          email: "mai@abe.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Misako",
          last_name: "Ono",
          email: "misako@ono.com",
          phone: "080-732-1819",
        },
        {
          first_name: "Momo",
          last_name: "Wada",
          email: "momo@wada.com",
          phone: "080-332-1611",
        },
        {
          first_name: "Midori",
          last_name: "Sakai",
          email: "midori@sakai.com",
          phone: "080-222-0392",
        },
        {
          first_name: "Rika",
          last_name: "Miyazaki",
          email: "rika@miyazaki.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Naoki",
          last_name: "Uchida",
          email: "naoki@uchida.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Taishi",
          last_name: "Hara",
          email: "taishi@hara.com",
          phone: "080-732-1819",
        },
        {
          first_name: "Ryohei",
          last_name: "Takeda",
          email: "ryohei@takeda.com",
          phone: "080-332-1611",
        },
        {
          first_name: "Noriaki",
          last_name: "Ueno",
          email: "noriaki@ueno.com",
          phone: "080-202-0392",
        },
        {
          first_name: "Ryoto",
          last_name: "Kojima",
          email: "ryoto@kojima.com",
          phone: "090-777-7777",
        },
        {
          first_name: "Satoru",
          last_name: "Chiba",
          email: "satoru@chiba.com",
          phone: "090-777-7777",
        }
      ]);
    });
};
