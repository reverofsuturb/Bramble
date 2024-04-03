"use strict";
const { Product } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Product.bulkCreate(
      [
        {
          name: "Chili-Cheese Car",
          price: 1277.55,
          description:
            "Visualize a unique and creative automobile concept where the entire structure of the vehicle is created out of chili cheese. Pay attention to the details such as the aerodynamic design of the car, the wheels, and the imagined interior, all fashioned from the spicy, gooey texture of chili cheese. Imagine the cheese-wheel tires, the chili engine, and the cheese coated body all amalgamating to form an interesting, yet bizarre, spectacle of a chili cheese automobile.",
          details: "spherical, round, dope",
          shipping: "Free Shipping",
          category_id: 13,
          user_id: 1,
        },
        {
          name: "Ducky's Wagyu Deluxe Computer with Broccoli Calculator",
          price: 6007.33,
          description:
            "Imagine a luxurious computer setup themed after the intricate marbling found in Wagyu beef. The computer includes a keyboard, a monitor, and a tower, all designed with rich texturization and colors to resemble the well-marbled meat. Alongside this decadent setup, there's a unique calculator designed to represent a fresh broccoli floret, capturing all its intricacies and details. These equipment together create an unusual, yet fascinating juxtaposition of indulgence and productivity.",
          details: "computer, meat, broccoli",
          shipping: "Free Shipping",
          category_id: 6,
          user_id: 1,
        },
        {
          name: "Corned Beef Computer",
          price: 33.33,
          description:
            "Picture an unusual machine with a striking similarity to regular computer systems. This device, however, is made entirely from corned beef. Its exterior has the texture and reddish-brown color of corned beef while also mirroring the structure and dimensions of a traditional personal computer. The keyboard, monitor, mouse, and even the smallest details like the keys and buttons are all meticulously formed from the same corned beef material. Although it seems impossible, this corned beef computer retains its shape and does not crumble under the weight of its own structure.",
          details: "fits, perfectly",
          shipping: "Free Shipping",
          category_id: 6,
          user_id: 1,
        },
        {
          name: "Greasy Lawn",
          price: 1000.23,
          description:
            "Imagine a unique landscape where a lush, green lawn is unusually greasy yet retains a certain appeal. The grass blades, shining from the excess oil, sit under a clear, bright blue sky. The sunlight hits the greasy surface, creating an array of sparkling reflections that give the scene an unexpected charm. Despite its greasiness, the lawn is meticulously maintained, elegantly manicured with patterns of well-kept hedges and small, colorful floral gardens dotting the area. This paradoxically greasy yet beautiful lawn teems with vibrant life as birds, squirrels, and insects go about their everyday activities, completely unfazed.",
          details: "meaty, dense, efficient",
          shipping: "Free Shipping",
          category_id: 14,
          user_id: 1,
        },
        {
          name: "Giant Rodent Who Loves Penguins",
          price: 2.33,
          description:
            "Visualize a scene with an unusually large mouse, demonstrating an affectionate behavior towards a group of penguins. Elements to include are the mouse's largeness in comparison to the penguins, the mouse attempting to hold a big seed in its hands, and the friendly interactions between the mouse and the penguins. The landscape around them could be a mix of a typical mouse habitat - perhaps a field - and a chilly Antarctic environment. The overall mood of the image should be light-hearted and humorous.",
          details: "tusks but not tusks",
          shipping: "Free Shipping",
          category_id: 3,
          user_id: 1,
        },
        {
          name: "Frankfurters But As Weapons",
          price: 7.54,
          description:
            "Visualize a peculiar concept where traditional frankfurters have been absurdly transformed into weapons. The frankfurters maintain their regular shape, size, and color, so there's no mistaking them for typical hotdogs. But, they are surreally modified with various weapon attributes like blades, arrowheads, and maybe even a trigger. The background is a light checkered picnic blanket on a grassy meadow on a sunny day, adding an amusing contrast to the unusual and potentially dangerous picnic food.",
          details: "spherical, round, dope",
          shipping: "Free Shipping",
          category_id: 7,
          user_id: 1,
        },
        {
          name: "Justice Loaf",
          price: 6.66,
          description:
            "Imagine a fantastic scene of a creature unlike any other. This creature resembles a human but is distinctively shaped like a loaf of bread. This being isn't ordinary, it is a hero of the wilderness. It roams the land, seething with determination to ensure justice for all creatures. It's seen against a canvas of vast landscapes, filled with dense forests and wide rivers. Its purposeful gaze adds a touch of seriousness to its otherwise whimsical form. This is a riveting portrait of a unique hero securing justice in the expansive wildlands.",
          details: "metal",
          shipping: "Free Shipping",
          category_id: 11,
          user_id: 1,
        },
        {
          name: "Fluffy Hippo",
          price: 12.13,
          description:
            "Create an image of an incredibly fluffy and plush hippopotamus with a playful expression on its face. It's sitting at a poker table, totally engrossed in the game. The table is equipped with poker chips, cards distributed to all players, and some chips stacked in the middle. The scene should depict that the hippo, with its distinct playfulness, is engaging actively in the poker game.",
          details: "Actually a being",
          shipping: "Free Shipping",
          category_id: 3,
          user_id: 1,
        },
        {
          name: "Magic Sandwich",
          price: 13.43,
          description:
            "An enchanting scene of a sandwich that seems to exhibit magical properties. It lies on a wooden countertop, illuminated by the soft light from a nearby window. The bread is freshly baked, a perfect golden brown, and fluffy. The fillings appear colorful and delicious. Blue sparks of magic emanate from the sandwich, swirling around it before dissipating into thin air. Bubbles of light float idly around it, and an aura of otherworldly energy surrounds the sandwich. Despite its ordinary composition, the sandwich carries an undeniable mystique, marking it as possibly magical.",
          details: "Very Delicious",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Ice Cream Chair",
          price: 123.43,
          description:
            "Envision a grand and deluxe chair, however peculiarly it is not crafted from ordinary materials. Instead, it's painstakingly sculpted from soft serve ice cream. It retains the rich and creaminess of the dessert, their swirls mimicking the intricate design of an upscale seating. The inherent contradiction between the opulent, regal design and the ephemeral, melting material should be striking, creating an image of paradoxical luxury.",
          details: "Actually a chair",
          shipping: "Free Shipping",
          category_id: 5,
          user_id: 1,
        },
        {
          name: "Banana Zest",
          price: 1232.43,
          description:
            "A detailed, close-up view of freshly grated banana zest. The zest has a vibrant yellow color and the texture is finely shredded, showing the tiny, slender strands. Some parts of the zest clump together, making small textured mounds. It's placed on a clean, dark-colored countertop, creating a stark contrast with the bright zest. There are small speckles of banana pulp and juice mixed in, offering a glimpse into the juiciness of the fruit.",
          details: "Actually priceless",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Electric Shoes",
          price: 12322.43,
          description:
            "Imagine a pair of shoes, glowing with the incandescent intensity of pure electricity. Twisting serpents of blue and white electrical currents form the shape of the shoes, from the high arches to the sturdily crafted soles. Their laces are made from pulsating strands of electricity, creating a dazzling light show against a pitch-black background. Yet, despite their electrifying construction, they seem tangible and wearable, inviting yet cautionary.",
          details: "Move like lightning",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
        {
          name: "Extremely Intelligent Rock",
          price: 122.43,
          description:
            "Imagine a rock with a unique characteristic: it possesses extreme intelligence. Display it engaged in an activity typically associated with intelligence: solving crossword puzzles. Surround the rock with sheets of paper filled with crossword puzzles, with a pencil at its side, imbibing the atmosphere of deep thought.",
          details: "Actually Dense",
          shipping: "Free Shipping",
          category_id: 3,
          user_id: 1,
        },
        {
          name: "Porridge Feeding Shorts",
          price: 100.43,
          description:
            "A pair of fantastical shorts that have been innovatively designed to prepare and serve porridge. The shorts are made from smart fabric, mixed with a blend of high-tech materials and can function with or without human interaction. They feature a built-in mechanism for porridge preparation: a small pocket that acts as an instant-heating oat mixer with attached pouches containing a selection of finely ground oats. The shorts can automatically dispense a perfectly mixed serving of warm, creamy porridge into an attached bowl at the front when activated, turning the simple act of breakfast into a futuristic experience.",
          details: "Actually Delicious",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
        {
          name: "Neon Pants",
          price: 34.43,
          description:
            "Imagine a pair of pants in vivid, bright, neon colors. The colors are so astonishing that they expand beyond the range of visible spectra. They can represent any color, even those that we as humans typically can't perceive. These pants are outlandishly radiant, showcasing a dazzling and extraordinary range of hues.",
          details: "Actually Fantastic",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
        {
          name: "Mutant Chicken Salad",
          price: 37.33,
          description:
            "A vision of a surreal chicken salad. The chicken ingredients are not from a regular farm-raised bird, but rather a unique species of chickens with multiple limbs, unusual plumage colors like iridescent purple and bright green, and three crest feathers crowning their heads. The salad is perfectly tossed with an array of fresh greens, sliced tomatoes, diced cucumbers, and a tangy vinaigrette dressing, contrasting with the delightful oddity of the mutant chicken pieces.",
          details: "Actually Fantastic",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Pot Roast Skateboard",
          price: 14.43,
          description:
            "Visualize an unconventional skateboard shaped like a succulent pot roast. This unique board is made entirely out of delectable homemade beef, adding a fun twist to its classic design. Not only is it a striking piece of art, but it's imagined to be surprisingly fast. The skateboard zooms down a hill, fittingly named the 'gravy hill', leaving a trail of gravy in its wake, perfectly encapsulating the notion of it being a 'pot roast skateboard'. The image should resound with the tempting aroma and visual appeal of roast beef, while keeping the vibe of a vigorous and lively skateboarding scene.",
          details: "Actually Fantastic",
          shipping: "Free Shipping",
          category_id: 15,
          user_id: 1,
        },
        {
          name: "Magic Night Light",
          price: 9.43,
          description:
            "Imagine a magical night light that has the ability to turn day into night. This unique piece of home decor projects captivating images of the dark midnight sky onto its surroundings. It glows softly, emitting shades of deep blues and purples, with twinkling stars and the moon scattered across it. The light is seen transforming a previously sunlit room with daylight pouring in through the windows into a soothing nightscape, giving an aura of tranquility and calmness. It's as if the universe has been encapsulated in this small, magical night light bringing the celestial charm right into your room.",
          details: "Actually Fantastic",
          shipping: "Free Shipping",
          category_id: 6,
          user_id: 1,
        },
        {
          name: "Superior Ham",
          price: 19.22,
          description:
            "Visualize a large, succulent piece of ham, beautifully marinated and prepped. It is not an ordinary piece of ham; it exhibits a peculiar radiance, as if it's about to explode into a supernova, surrounded by a cluster of star-like specks representing flavor intensity and hunger-induced imagination. Add a background of a cosmic setting to accentuate the 'about to become a supernova' aspect, perhaps some distant constellations and nebulas.",
          details: "Actually Fantastic",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Gruesome Scythe",
          price: 21.22,
          description:
            "Visualize an eerie, large scythe. The handle is intricately adorned with monstrous features, similar to oversized feral teeth, giving an impression of menacing fangs. Additionally, it features a globs of wet, glistening substance that can be equated with eyes that emit a gelatinous, ooze effect. Its overall appearance conveys a gruesome and terrifying atmosphere.",
          details: "Actually Sharp",
          shipping: "Free Shipping",
          category_id: 7,
          user_id: 1,
        },
        {
          name: "Not An Elephant, But Actually A Chair",
          price: 1021.22,
          description:
            "An unusual object that, despite the apparent contradictions implied by its title, exhibits characteristics of both an elephant and a chair. It's a play on perceptions and expectations, challenging the viewer to reconcile the animalistic features and functional aspects of a piece of furniture. The chair is constructed in a traditional style, with a sturdy back and four legs. However, the elephant traits are undeniable, with its skin texture and colour, large ears, and iconic trunk seamlessly incorporated into the chair design, making this a unique and thought-provoking piece of art.",
          details: "Actually Trunkular",
          shipping: "Free Shipping",
          category_id: 5,
          user_id: 1,
        },
        {
          name: "Rainbow Wiggle Slime",
          price: 10221.22,
          description:
            "Imagine a unique and playful creature known as Wiggle Slime. This fascinating being has a texture that resonates with a chewy candy, making you want to touch it. Its body is comprised of captivating bands of rainbow colors entwining and weaving together. Every layer of color glistens, ranging from hues of fiery red and radiant orange to refreshing green, deep blue, and royal purple. It's like a living, palpable spectrum, effortlessly reflecting light and filling its surroundings with joyous colors.",
          details: "Actually Slimy",
          shipping: "Free Shipping",
          category_id: 3,
          user_id: 1,
        },
        {
          name: "Salami Champion",
          price: 600.23,
          description:
            "Depict a whimsical satirical merging of two seemingly unrelated topics: a typical medieval knight, armored, helmeted, and wielding a formidable long sword, and a cured salami sausage. The knight's armor is formed of sections of golden-brown salami, complete with fatty marbling. The helmet, also made of salami, covers the knight's obscured face. The sword, a shimmering steel marvel, contrasts with the comical nature of the salami armor. The knight stands proudly, despite his unusual attire, in a typical medieval setting of a cobblestone courtyard with turrets and a castle backdrop.",
          details: "Actually Salami",
          shipping: "Free Shipping",
          category_id: 8,
          user_id: 1,
        },
        {
          name: "Oranges With Eyeballs",
          price: 200.17,
          description:
            "Visualize a surreal scene where oranges have a pair of eyeballs each, giving them an anthropomorphic appeal. The oranges are perfect in complexion, intensely orange in color, ripe, and appealing. These uncanny fruits, although peculiar, radiates an energetic vibe that amplifies their fantastical characteristic. Imagine this scene set against a rustic wooden table background.",
          details: "Actually Fruit",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Liquid Wig",
          price: 2000.17,
          description:
            "An intriguing wig that appears to be confoundingly crafted from a liquid substance. The wig should show properties consistent with liquid physics such as fluid movements, surface ripple effects and droplets falling down. The color of the wig can be a vibrant, rich tone, allowing for a captivating and eye-catching visual spectacle. The background can be minimalistic, in order to emphasize the liquid aspect of the wig. The style of the wig can be long and wavy as this might more clearly illustrate the fluid-like nature of its material.",
          details: "Actually Wearable",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
        {
          name: "Flying Dishwasher",
          price: 1800.11,
          description:
            "Visualize a unique invention: a flying dishwasher that has the capability to clean dishes in midair. This revolutionary appliance comes equipped with high-powered laser-focused streams, an advanced feature that thoroughly scrubs and sanitizes dishes. The dishwasher levitates in the air, defying gravity, while jets of water and soap burst forth from various nozzles, with laser precision, to clean each dish separately. Every part of the dishwasher is in action, washing, rinsing and drying dishes while hovering in the air.",
          details: "Actually Washable",
          shipping: "Free Shipping",
          category_id: 5,
          user_id: 1,
        },
        {
          name: "Hawk Composed Of Tarantulas",
          price: 180.13,
          description:
            "Visualise a unique scene showcasing a hawk, but instead of its typical feathers and body structure, it's composed entirely of tarantulas. The tarantulas are arranging themselves to shape the form of the hawk, from its sharp, piercing eyes, its formidable beak, to the broad wings and powerful talons. The tarantulas maintain their natural colors and textures, resulting in the hawk having an unusual, slightly intimidating appearance which vividly contrasts against the serene background of a clear sunny sky.",
          details: "Actually Flies",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Don't Doubt Poster",
          price: 50.56,
          description:
            "An inspirational poster in classic earth tones, featuring the words 'Don't Doubt' written in bold letters. The background is a scenic sunset over a vast desert landscape, emphasizing the majesty of nature. The sunset radiates warm hues and the desert sand reflects this warmth, creating an inviting atmosphere that encourages self-belief.",
          details: "Actually Poster",
          shipping: "Free Shipping",
          category_id: 12,
          user_id: 1,
        },
        {
          name: "Wizard Bracelet",
          price: 150.89,
          description:
            "Visualize an intricately designed bracelet that features four wizard figurines as its charms. Each wizard has a unique look and distinctive wizardry accessories. The first wizard could be a middle-aged, white man with long, silver hair, holding a crystal ball. The second might be a young, Hispanic woman with her wand shooting sparkling spells. The third may be an elderly, black man holding an ancient spell book and the fourth, a South Asian girl, in her teens, with a magical staff, shimmering with enchantment. Each charm is crafted in great detail, indicating their magical prowess.",
          details: "Actually Bracelet",
          shipping: "Free Shipping",
          category_id: 11,
          user_id: 1,
        },
        {
          name: "Old School Meets New School",
          price: 10000.89,
          description:
            "A scene presenting a type of art influenced by old masters. Not copying but taking inspiration from it. The scene is filled with the spirit of newness, innovation, and boldness reminiscent of the old school but incorporating modern elements as well. You can be sure to discern elements such as the strong brushwork reminiscent of the pre-1912 era made famous by the old masters, yet there is a clear touch of today in the usage of color, composition, and techniques. Be it abstract or realist, the scene captures the essence of new school while nodding to the old.",
          details: "Actually Art",
          shipping: "Free Shipping",
          category_id: 12,
          user_id: 1,
        },
        {
          name: "Puppy Made Of Yogurt",
          price: 23.89,
          description:
            "Visualize a cute, small puppy sculpted entirely out of fresh, white yogurt. Details include soft, droopy ears, a round tail, and tiny paws, all carefully formed. The yogurt shines subtly in soft light, emphasizing the creamy texture. The overall scene is cheerful and whimsical, creating a sense of wonder at the delicate and transitory art of food sculpting.",
          details: "Actually Barks",
          shipping: "Free Shipping",
          category_id: 3,
          user_id: 1,
        },
        {
          name: "Nonflying Dishwasher",
          price: 1703.89,
          description:
            "Visualize a technologically advanced dishwasher. This unique appliance is designed in such a way that it can clean dishes whilst they are suspended in mid-air. This state-of-the-art dishwasher doesn't rely on traditional water streams. Instead, it uses high-powered laser-focused streams to meticulously strip every bit of dirt and food residue from each dish. The lasers are perfectly safe for the dishes and use a minimal amount of water for efficiency and eco-friendliness.",
          details: "Actually Cleans",
          shipping: "Free Shipping",
          category_id: 5,
          user_id: 1,
        },
        {
          name: "Floating Soup",
          price: 1003.89,
          description:
            "Imagine a whimsical scene featuring an ensemble of mystical, magical beings of diverse descents and genders. There's a floating, steamy soup with diversified vegetables, chunks of meat and a swirl of noodles suspended in mid-air, without any bowl. These beings are feasting on it using enchanted utensils, emitting gentle glows. They hover around the soup in a circle, captivated by its aromas and flavors. Each magical creature is distinctly designed, varying in size and shape, from small pixie-like figures to towering entities, some with wings, others with mystical motifs.",
          details: "Actually Mystical",
          shipping: "Free Shipping",
          category_id: 12,
          user_id: 1,
        },
        {
          name: "Monstrous Yogurt Frog",
          price: 803.89,
          description:
            "Visualize a fantastically monstrous frog, proportionally enlarged to a point at which it would impose awe and terror. However, the expectations that the creature is made of normal materials are shattered when instead of skin and muscle, the monstrous frog appears to be composed entirely of yogurt. Its texture has the creamy and slightly granulated consistency of plain yogurt, with a pure, glistening white color. The creature is amidst the process of performing a leap, giving a dynamic pose to the bizarre and slightly humorous scenario.",
          details: "Actually Monstrous",
          shipping: "Free Shipping",
          category_id: 3,
          user_id: 1,
        },
        {
          name: "Half Eaten Tub Of Mayonnaise With A Secret",
          price: 803.89,
          description:
            "Imagine a scene showcasing a half-eaten tub of mayonnaise. In this scene, the ordinary mayonnaise tub has a twist - it contains an intergalactic secret. Perhaps upon opening the lid, there's a mesmerizing vista of galaxies and stars visible inside. Surrounding it, the detritus of a recent meal - pieces of bread, a knife with mayo remnants offer a stark contrast. The lighting gives a slight glow to the contents of the tub, filling the scene with a sense of mystery and awe. The whole setting is filled with questions - what is the secret? How did it get there? What happens next?",
          details: "Actually Secret",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Happy Friend",
          price: 503.89,
          description:
            "A character displaying an unsettling level of happiness that suggests potential evilness. Nevertheless, this character also emits a strong sense of loyalty and dedication, ready to go to great lengths for their friends. The character is gender-neutral and of ambiguous descent, with a mischievous twinkle in their eyes and a bright smile that never fades.",
          details: "Actually Evil?",
          shipping: "Free Shipping",
          category_id: 3,
          user_id: 1,
        },
        {
          name: "Steel Vest",
          price: 202.76,
          description:
            "Create an image of a vest made from solid steel. Despite its heavy material, it carries a unique style reminiscent of the 1970s French ascot fashion. It unites industrial toughness with the sophistication and flair of that period in European culture, making it a unique piece of clothing.",
          details: "Actually Steel",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
        {
          name: "Ant Organization",
          price: 563.89,
          description:
            "An intricate visualization of an ant colony in motion. The ants, a variety of ants known for their organizational skills, move purposefully, carrying food and building material. Their paths crisscross in a dizzying network of efficiency. Overhead, a series of charts and diagrams elucidates the structure and social dynamics of the ant colony. They display ant roles, hierarchy, and communication methods in detail. Additional graphics reveal the layout of the ant hill, complete with nurseries, food storage, and the queen's chamber. A thread of a narrative implicitly communicates the remarkable degree to which these tiny creatures are organized.",
          details: "Actually Steel",
          shipping: "Free Shipping",
          category_id: 12,
          user_id: 1,
        },
        {
          name: "Wearable Antlers",
          price: 1473.89,
          description:
            "Showcase the latest trend in fashion accessories - body antlers. They are versatile and can be adapted to different parts of the human body. Display multiple variations of these antlers, with them being adorned by different people of diverse descents like Caucasian, Hispanic, South Asian, and Black. Both men and women should be included, each fitting the antlers on different parts of their bodies such as on their heads, around their wrists, woven into their hair, among others. Keep the setting trendy and vibrant to reflect the fun and bold nature of the accessory.",
          details: "Actually Hip",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
        {
          name: "Gummy Goodness",
          price: 1.89,
          description:
            "Edible candies shaped like a stylized cartoon boy with big hair. These candies should be brightly colored and give a sense of fun and playfulness. The boy the candies are modeled after should have a large, rounded hairstyle, big expressive eyes, a cute smile, and small nose. He should be dressed in a red shirt and blue jeans, conveying a youthful and mischievous image. Please ensure that all details of the candy mirror the described cartoon boy's features.",
          details: "Actually Gummy",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "Time Diary",
          price: 1234.89,
          description:
            "Imagine a futuristic device, an automatic diary that is capable of translating and recording your thoughts instantly. The device itself appears as a classical paper diary with an antique-looking cover and crisp blank pages inside. However, it is imbued with advanced technology allowing it to receive invisible transmissions of thoughts from its user. Behind the cover of the diary, you'd notice a complex arrangement of miniature circuitry, glinting in a fluorescence. The thoughts are inscribed in beautiful cursive script, mimicking the elegance of human handwriting.",
          details: "Actually Transcendent",
          shipping: "Free Shipping",
          category_id: 6,
          user_id: 1,
        },
        {
          name: "Talking Pencil",
          price: 2.89,
          description:
            "Visualize a unique pencil, quite sentient and extraordinary in its characteristics. It possesses a remarkably large mouth positioned towards its top portion. The mouth is always active, chattering away with a whimsical expression. The fascinating aspect about this pencil is that it has a penchant for providing ill advice regarding any written content. Capture this animated stationery in a light-hearted, yet cautionary sense.",
          details: "Actually Talks",
          shipping: "Free Shipping",
          category_id: 15,
          user_id: 1,
        },
        {
          name: "Hairy Shoes",
          price: 230.89,
          description:
            "A pair of unique sneakers that appear as if they are made from luscious hair. The design of the sneakers is reminiscent of the extravagant and flashy fashion trend of the early 80s glam rock scene. Lastly, a distinct touch is the shoelaces, which are styled to resemble finely groomed mustaches.",
          details: "Actually Talks",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
      ],
      { validate: true }
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
