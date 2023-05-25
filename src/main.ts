import { DOMTerminal } from "./terminal";

let domTerminal = new DOMTerminal();

let run = true;

setInterval(() => {
    if (run) {
        handleGame();
    }
}, 10);

interface StoryItemOption {
    text: string,
    shortText: string,
    clear: boolean,
    setState: () => number
}

interface StoryItem {
    id: number;
    text: string;
    options: StoryItemOption[];
    state?: any | undefined | null;
}

let gateItems: StoryItem[] = [
    {
        id: 0,
        text:
            ` ___       ___                    __      __  ___                                 ___     \r
  |  |__| |__     |     /\\  |\\ | |  \\    /  \\ |__     |__| |  |  |\\/|  /\\  |\\ | |  |  \\ / \r
  |  |  | |___    |___ /~~\\ | \\| |__/    \\__/ |       |  | \\__/  |  | /~~\\ | \\| |  |   |  \r\n`,
        options: [
            {
                text: "enter",
                shortText: "a",
                clear: true,
                setState: () => 1
            },
            {
                text: "quit",
                shortText: "q",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData("YOU CAN'T LEAVE\r\n");
                    return 1;
                }
            }
        ],
    },
    {
        id: 1,
        text: `Welcome to the Land of Humanity! As you walk through the gate and past the Immigrant's gift shop (Buy American Flags, Apple Pie, Hot Dogs, English Books!), you see a little girl standing under a replica of the statue of liberty, which has the familiar poem \"The New Colossus\" by Emma Lazarus carved on it. In contrast to the positive tone of this poem, the little girl eerily warns you\r\n


    Prospective Immigrants Please Note
    Either you will
    go through this door
    or you will not go through.

    If you go through
    there is always the risk
    of remembering your name.

    Things look at you doubly
    and you must look back
    and let them happen.

    If you do not go through
    it is possible
    to live worthily

    to maintain your attitudes
    to hold your position
    to die bravely

    but much will blind you,
    much will evade you,
    at what cost who knows?

    The door itself makes no promises.
    It is only a door.

    - Adrienne Rich
\nDo you still want to enter?\r\n`,
        options: [
            {
                text: "enter",
                shortText: "a",
                clear: true,
                setState: () => 2
            }
        ],
    },
    {
        id: 2,
        text: "Concerned, you move on. As you approach a building in the distance, you hear rumbling, not unlike thunder. Drawing near to this building, past Dame Van Winkle who is screaming at you to get out, you make out the words on the sign \"RIP VAN WINKLE TAVERN\". You move into the Rip Van Winkle Tavern which is unsettlingly quiet yet full of giant people, all staring at you. A large hand offers you a tankard of something alcoholic.\n\nDo you drink?\n",
        options: [
            {
                text: "yes",
                shortText: "y",
                clear: true,
                setState: () => 3
            },
            {
                text: "quit",
                shortText: "q",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData("As you stumble out of the tavern, you pass out and wake up in your bed. The whole day is fuzzy and slowly disappears from your memory.\n");
                    return -1;
                }
            }
        ]
    },
    {
        id: 3,
        text: "You find the liquor to be better than anything that you've ever tasted. Do you keep drinking?\n",
        state: {
            nDrinks: 0
        },
        options: [
            {
                text: "yes",
                shortText: "y",
                clear: true,
                setState: () => {
                    if (gateItems[3].state.nDrinks >= 4) {
                        return 4;
                    }

                    gateItems[3].state.nDrinks++;
                    return 3;
                }
            },
            {
                text: "quit",
                shortText: "q",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData("As you stumble out of the tavern, you pass out and wake up in your bed. The whole day is fuzzy and slowly disappears from your memory.\n");
                    return -1;
                }
            }
        ]
    },
    {
        id: 4,
        text: "You drift off to sleep and wake up to rocking and the sound of waves on wood...\nContinue?\n",
        options: [
            {
                text: "yes",
                shortText: 'y',
                clear: true,
                setState: () => 5
            }
        ]
    },
    {
        id: 5,
        text: "TUOLOMEE\n\nThat's probably the name of the boat you are on.\nRising up from the deck of the ship, you see that you are stuck in a massive storm and the captain is panicking.\n\n\"GET OVER HERE AND HELP\"\n\nClearly this guy doesn't know how to properly steer a boat——but you do. Right?\n\nAs a wave comes from the left, you find yourself gripping the wheel.\n",
        options: [
            {
                shortText: "r",
                text: "Steer Right",
                clear: true,
                setState: () => 6
            },
            {
                shortText: "l",
                text: "Steer Left",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData("The yacht is overcome by the wave, you black out and wake up in your bed. The whole day is fuzzy and slowly disappears from your memory.\n");
                    return -1;
                }
            }
        ]
    },
    {
        id: 6,
        text: "Suddenly, you see a wave coming from the right\n",
        options: [
            {
                shortText: "l",
                text: "Steer Left",
                clear: true,
                setState: () => 7
            },
            {
                shortText: "r",
                text: "Steer Right",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData("The yacht is overcome by the wave, you black out and wake up in your bed. The whole day is fuzzy and slowly disappears from your memory.\n");
                    return -1;
                }
            }
        ]
    },
    {
        id: 7,
        text: "After half an hour of maneuvering the boat out of the storm, the captain introduces himself, slightly slurring his words: Hello, my name is Dan Cody. I own this boat. I thank you deeply for saving our hides. I'll tell you what, I've got a reward for you. I can transfer you a thousand dollars or all of my buisiness knowledge.\n",
        options: [
            {
                shortText: "a",
                text: "Take the Money",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData("You wake up with a thousand dollars in your pocket with no recollection of your journey.\n");
                    domTerminal.writeData("Something doesn't feel right in your gut...\n");
                    return -1;
                }
            },
            {
                shortText: "b",
                text: "Take the Information",
                clear: true,
                setState: () => {
                    return 8;
                }
            }
        ]
    },
    {
        id: 8,
        text: "You suddenly feel yourself comprehend the ins and outs of market trends, stocks, and economic jargon that one accumulates after decades of experience with the American economy. Emboldened, you continue on your journey through the land.\n",
        options: [
            {
                shortText: "c",
                text: "continue",
                clear: true,
                setState: () => 9
            }
        ]
    },
    {
        id: 9,
        text: "Welcome to THE LAND OF LIFE. OWNER: J. GATSBY\n\nIn front of you, you see a massive neon-lit building with blaring music, full of people.\nAt the door, a man dressed in a suit hands you a card\n\n\"This has unlimited money in it. It\'ll pay for food, drinks, and entertainment, you just can't take it outside. You should check out the yellow car go cart races over there. If you are feeling lucky, you can go and talk to Wolfsheim over there and invest you hard earned money in some alcohol (as long as you don't tell the cops). And if you don't mind getting wet, you can check out Gatsby's pool!\"\nHave fun!\n",
        options: [
            {
                shortText: "c",
                text: "continue",
                clear: true,
                setState: () => 10
            }
        ]
    },
    {
        id: 10,
        text: "You find your favorite game. The slot machines and swipe your card.\n",
        options: [
            {
                shortText: "c",
                text: "continue",
                clear: true,
                setState: () => 11
            }
        ]
    },
    {
        id: 11,
        text: "",
        state: {
            points: 0,
        },
        options: [
            {
                shortText: "s",
                text: "spin",
                clear: false,
                setState: () => {
                    domTerminal.clear();

                    let slotState = [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]
                    ]

                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            slotState[i][j] = Math.floor(Math.random() * 5 + 3);
                        }
                    }

                    let points = 0;
                    for (let arr of slotState) {
                        if ((new Set(arr)).size === 1) {
                            points += 10;
                        }
                    }

                    for (let i = 0; i < 3; i++) {
                        domTerminal.writeData(`[${slotState[i][0]} | ${slotState[i][1]} | ${slotState[i][2]}]\n`);
                    }
                    domTerminal.writeData(`\nYou won ${points} points\n`);
                    gateItems[11].state.points += points;
                    return 11;
                }
            },
            {
                shortText: "q",
                text: "quit",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData(`At the exit, another man in a suit takes your card from you and gives you a choice to make.\n\n\"Do you want to me to convert your ${gateItems[11].state.points} points into cash and lose your money or do you want to keep your memories and continue?\"\n`);
                    return 12;
                }
            }
        ]
    },
    {
        id: 12,
        text: "",
        options: [
            {
                clear: true,
                text: "Keep memories and continue",
                shortText: "k",
                setState: () => 13
            },
            {
                shortText: "t",
                text: "Take the Money",
                clear: false,
                setState: () => {
                    domTerminal.clear();
                    domTerminal.writeData(`You wake up with $${gateItems[11].state.points * 0.01} in your pocket`);
                    domTerminal.writeData("Something doesn't feel right in your gut...\n");
                    return -1;
                }
            },

        ]
    },
    {
        id: 13,
        text: "\"Thank you for choosing your memories over monetary profit\", a voice echoes from above, \"The choice of morality over personal gain is one that humans struggle with, and you made the noble choice my friend. According to Manaavi Singh, \'People got excited about both things and events. But they tended to feel more positive about experiential purchases, and their feelings about material purchases were more likely to be tinged with feelings of impatience.\'\" Looking up, you realize it is Walt Whitman Himself. \n\n\"Ralph Waldo Emmerson said it best \'To finish the moment, to find the journey's end in every step of the road, to live the greatest number of good hours, is wisdom.\'\"\n\nWelcome to the Land of Speech. Perhaps one of the most vital aspects of modern human rights is free speech. Here we analyze the importance of free speech and its opponents.\nWould you care to go on a stroll with me?\n",
        options: [
            {
                text: "yes",
                shortText: "y",
                setState: () => 14,
                clear: true
            }
        ]
    },
    {
        id: 14,
        text: `As you strolled with Whitman through the American country side. He explained his view on individualism to you.\n
“Emmerson also said \'It is easy in the world to live after the world's opinion; it is easy in solitude after our own; but the great man is he who in the midst of the crowd keeps with perfect sweetness the independence of solitude.\'”\n
In other words, maintain your own opinions and always struggle to seperate yourself from the masses. There is no good in having the crowd take
control of your opinions.\n\n\"Instead, live in nature and appreciate yourself.\"\n\n
`,
        options: [
            {
                text: "yes",
                shortText: "y",
                setState: () => 15,
                clear: true
            }
        ]
    },
    {
        id: 15,
        text:
            `You bid farewell to Whitman and continue down your path to meet Langston Hughes in a house surrounded by a white picket fence,
with a chicken in a pan, and plenty of people inside. To your surprise, Langston Hughes was excluded from the table.

"Why?", you ask Hughes.

Hughes wearily responds with his very own poem:

I, too, sing America.

I am the darker brother.
They send me to eat in the kitchen
When company comes,
But I laugh,
And eat well,
And grow strong.

Tomorrow,
I’ll be at the table
When company comes.
Nobody’ll dare
Say to me,
“Eat in the kitchen,”
Then.

Besides,
They’ll see how beautiful I am
And be ashamed—

I, too, am America.


"Listen", he says, \"they can't ignore us forever. We are an integral part of this nation. Our voices will be heard\"\n`,
        options: [
            {
                text: "continue",
                shortText: "c",
                setState: () => 16,
                clear: true
            }
        ]
    },
    {
        id: 16,
        text:
            `On your way out of that unjust house you encounter James Baldwin, strolling through Brooklyn.
\"I see you've met Hughes\", he tells you, \"it's been more than 30 years since he published that poem. We haven't made
the progress that he prophesized. It\'s time to fight back.\"

\"Do you see all of this\", he exclaims gesturing at the white affluence, rape, and police cruelty.

\"This system of oppression is too engrained in our society. They are crushing our lives and voices and we need to stick up for ourselves.\"\n`,
        options: [
            {
                text: "continue",
                shortText: "c",
                setState: () => 17,
                clear: true
            }
        ]
    },
    {
        id: 17,
        text:
            `On your way out, you trip and fall into a manhole and find yourself on a raft with Huckleberry Finn and Jim in The Land of Change.\n
It becomes apparant that they are struggling to keep together in the strong current. After they are both
swept away from the current, you fast forward to both of them on dry land, with Huck trying to convince Jim
that it was all a dream.

After Jim figured out that the whole thing was a lie, you hear Huck, a white, southern child apologize to Jim
in a rare occurence of humanity.

Perhaps there is hope for change.\n`,
        options: [
            {
                text: "continue",
                shortText: "c",
                setState: () => 18,
                clear: true
            }
        ]
    },
    {
        id: 18,
        text:
            `Upon hearing this, you teleport to packed amphitheater, where Gerry Gambill is giving a speech on The Art of Stealing Human Rights

"Encourage the Indian to take his case to court. This is very expensive, takes lots of time and energy and is very safe because laws are stacked against him. The court's ruling will defeat the Indian's cause, but makes him think he has obtained justice."

You realize that this is a satirical piece and Gambill is speaking out against tactics used by the US government, among others, to take away others' human rights. You also realize the power that satirical writing can have on change.
`,
        options: [
            {
                text: "continue",
                shortText: "c",
                setState: () => 19,
                clear: true
            }
        ]
    },
    {
        id: 19,
        text:
        `Throughout this entire journey, you learned that America is a complex place. While some may characterize the place as full of good,
or full of evil, the truth is more nuanced than that. Reading novels such as The Great Gatsby, we find that morality and character is valued
more in American society than affluence. Another important aspect of American society is our dedicated to free speech: who speaks for us matters. We find this same theme in the land of change where we see the disparities and attempts to change them for the better.\n`,
        options: [
            {
                text: "finish",
                shortText: "f",
                setState: () => -1,
                clear: false
            }
        ]
    }
];

let currentID = 0;
let alreadyPrinted = false;
function handleGame() {
    let currentState = gateItems[currentID];

    if (!alreadyPrinted) {
        domTerminal.writeData(currentState.text);

        for (let option of currentState.options) {
            domTerminal.writeData(option.shortText + ") " + option.text + "\n");
        }

        domTerminal.writeData("> ")
        alreadyPrinted = true;
    } else if (domTerminal.inputReady) {
        let input = domTerminal.readLine();
        console.log(input);
        for (let option of currentState.options) {
            if ((input.toLowerCase() === option.text.toLowerCase()) || (input.toLowerCase() === option.shortText.toLowerCase())) {
                if (option.clear) {
                    domTerminal.clear();
                }

                alreadyPrinted = false;
                currentID = option.setState();

                if (currentID == -1) {
                    domTerminal.writeData("GAME OVER...\n");
                    run = false;
                }
                break;
            }
        }

        if (alreadyPrinted) {
            domTerminal.writeData("> ")
        }
    }
}
