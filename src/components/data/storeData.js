//fruit store
import mixedFruitBowl from '../../assets/mixedfruitbowl.jpeg';
import choppedwatermelon from '../../assets/choppedwatermelon.jpg';
import choppedpineapple from '../../assets/choppedpineapple.jpeg';
import slicedoranges from '../../assets/slicedoranges.jpeg';
import slicedkiwi from '../../assets/slicedkiwi.jpeg';
import slicedpeach from '../../assets/slicedpeach.jpeg';
import washedgrapes from '../../assets/washedgrapes.jpeg';
import carrotjuice from '../../assets/carrotjuice.jpeg';
import mangojuice from '../../assets/mangojuice.jpeg';
import strawberryjuice from '../../assets/strawberryjuice.jpeg';
import grapejuice from '../../assets/grapejuice.jpeg';
import orangejuice from '../../assets/orangejuice.jpeg';
import watermelonjuice from '../../assets/watermelonjuice.jpeg';
import applejuice from '../../assets/applejuice.jpeg';
import pineapplejuice from '../../assets/pineapplejuice.jpeg';
import mangobananasmoothie from '../../assets/mangobananasmoothie.jpeg';
import strawberryyogurtsmoothie from '../../assets/strawberryyogurtsmoothie.jpeg';
import greensmoothie from '../../assets/greensmoothie.jpeg';
import honeylemonsmoothie from '../../assets/honeylemonsmoothie.jpeg';
import berrysmoothie from '../../assets/berrysmoothie.jpeg';

//western store
import chickensalad from '../../assets/chickensalad.jpg';
import spaghettimarinara from '../../assets/spaghettimarinara.jpeg';
import bbq from '../../assets/bbq.jpeg';
import bacon from '../../assets/bacon.jpeg';
import cheeseburger from '../../assets/cheeseburger.jpeg';
import vegstirfry from '../../assets/vegstirfry.jpeg';
import chicken from '../../assets/chicken.jpeg';
import veggie from '../../assets/veggie.jpeg';
import fries from '../../assets/fries.jpeg';
import spicytang from '../../assets/spicytang.jpeg';
import sprite from '../../assets/sprite.jpeg';
import vegtang from '../../assets/vegtang.jpeg';
import salad from '../../assets/salad.jpeg';
import classic from '../../assets/classic.jpeg';
import spicy from '../../assets/spicytang.jpeg'; //correctionn needed
import onionrings from '../../assets/onionrings.jpeg';
import nuggets from '../../assets/nuggets.jpeg';
import popchicken from '../../assets/popchicken.jpeg';
import fanta from '../../assets/fanta.jpeg';
import cola from '../../assets/cola.jpeg';
import icedtea from '../../assets/icedtea.jpeg';
import hotchoco from '../../assets/hotchoco.jpeg';
import tomatosoupgc from '../../assets/tomatosoupgc.jpeg';
import eggfriedrice from '../../assets/eggfriedrice.jpeg';
import bakedpotato from '../../assets/bakedpotato.jpeg';
import pastaprimavera from '../../assets/pastaprimavera .jpeg';
import chickenquesadilla from '../../assets/chickenquesadillas.jpeg';
import chillicorncarne from '../../assets/chillicorncarne.jpeg';
import vegomelete from '../../assets/vegomelete.jpeg';

// Add other imports for images

const storeData = [
  {
    id: 1,
    name: '快乐西餐',
    icon: '/storeIcon1.png',
    items: [
      {
      id:101,
    name: '烤鸡沙拉(Grilled Chicken Salad)',
    description:'烤鸡胸肉，混合蔬菜沙拉，樱桃番茄，黄瓜，佐以轻盈油醋汁。',
    price: '19',
    image: chickensalad,
      },
      {
        id:102,
    name: '番茄意大利面(Spaghetti with Marinara Sauce)',
    description:'配自制番茄酱的简单意大利面，旁边配有蒜香面包。',
    price: '19',
    image: spaghettimarinara,
      },
      {
        id:103,
    name: '蔬菜炒饭(Veggie Stir-Fry with Rice)',
    description:'混合时令蔬菜，用酱油调味，与蒸米饭一起炒制。',
    price: '19',
    image: vegstirfry,
      },
      {
        id:104,
      name:'番茄汤配烤奶酪三明治(Tomato Soup and Grilled Cheese Sandwich)',
      description:'番茄汤配烤奶酪三明治 经典组合，奶油番茄汤配上芝士烤三明治，舒心美味。',
      price: '17',
      image: tomatosoupgc,
      },
      {
        id:105,
      name:'蛋炒饭(Egg Fried Rice)',
      description:'蛋，豌豆，胡萝卜和洋葱炒饭，加入少许酱油和芝麻油。',
      price:'12',
      image: eggfriedrice,
      },
      {
        id:106,
      name:' 烤土豆配料(Baked Potato with Toppings)',
      description:'大号烤土豆，可以选择多种配料，如酸奶油，细香葱，碎奶酪，和培根碎。',
      price:'5',
      image: bakedpotato
      },
      {
        id:107,
      name:'春季蔬菜意面(Pasta Primavera)',
      description:'意大利面拌时令蔬菜，橄榄油和大蒜调味。',
      price:'18',
      image: pastaprimavera,
      },
      {
        id:108,
      name:'鸡肉玉米饼(Chicken Quesadilla)',
      description:'玉米面饼夹杂调味鸡肉，彩椒，洋葱和融化的奶酪，旁边配有莎莎酱。',
      price:'13',
      image: chickenquesadilla,
      },
      {
        id:109,
        name:'辣椒炖肉(Chili Con Carne)',
        description:'一碗丰盛的辣椒炖肉，包含碎牛肉，红豆，番茄和辣椒香料，配几片面包。',
        price:'15',
        image: chillicorncarne,
      },
      {
        id:110,
        name:' 蔬菜煎蛋(Vegetable Omelette) ',
        description:'三个鸡蛋制成的煎蛋，内有切碎的蔬菜和奶酪，旁边配有烤面包。',
        price:'7',
        image: vegomelete
      },
    ],
  },
  {
    id: 2,
    name: '麻辣汤',
    icon: '/storeIcon2.png',
    items: [
      {
        id:201,
      name: '辣汤底',
      description:'传统的四川辣椒基础汤。',
      image: spicytang,
        },
        {
          id:202,
        name: '清汤底',
        description:'温和的鸡肉或蔬菜汤。',
        image: vegtang,
          },
        {
          id:203,
        name: '羊肉',
        weight:'100',
        price: '3.5',
          },
        {
          id:204,
        name: '猪肉',
        weight:'100',
        price: '2.5',
          },
        {
          id:205,
        name: '牛肉',
        weight:'100',
        price: '4.0',
          },
        {
          id:206,
        name: '鸡肉',
        weight:'100',
        price: '2.5',
          },
        {
          id:207,
        name: '罗非鱼',
        weight:'100',
        price: '2.5',
          },
        {
          id:208,
        name: '虾',
        weight:'100',
        price: '4.5',
          },
        {
          id:209,
        name: '白菜',
        weight:'100',
        price: '1.0',
          },
        {
          id:210,
        name: '菠菜',
        weight:'100',
        price: '1.0',
          },
        {
          id:211,
        name: '甜玉米',
        weight:'100',
        price: '1.5',
          },
        {
          id:212,
        name: '蘑菇',
        weight:'100',
        price: '2.0',
          },
        {
          id:213,
        name: '彩椒',
        weight:'100',
        price: '1.5',
          },
        {
          id:214,
        name: '莲藕',
        weight:'100',
        price: '2.0',
          },
        {
          id:215,
        name: '硬豆腐',
        weight:'100',
        price: '1.0',
          },
        {
          id:216,
        name: '豆腐皮',
        weight:'100',
        price: '1.5',
          },
        {
          id:217,
        name: '豆泡',
        weight:'100',
        price: '1.5',
          },
        {
          id:218,
        name: '粉丝',
        weight:'100',
        price: '1.0',
          },
        {
          id:219,
        name: '乌冬面',
        weight:'100',
        price: '1.5',
          },
        {
          id:220,
        name: '年糕',
        weight:'100',
        price: '1.5',
          },                                                                           
                                                                                                                      
    ],
  },
  {
    id: 3,
    name: 'BUSSIN 汉堡',
    icon: '/storeIcon3.png',
    items: [
      {
        id: 301,
        name: '经典汉堡（Classic Burger）',
        description: '精选牛肉饼，搭配生菜、番茄、洋葱、腌黄瓜片、奶酪和特制酱料',
        price: '18',
        image: classic
      },
      {
        id: 302,
        name: '芝士汉堡（Cheeseburger）',
        description: '经典汉堡加上一层融化的奶酪，经典不失风味',
        price: '20',
        image: cheeseburger
      },
      {
        id: 303,
        name: '鸡肉汉堡（Chicken Burger）',
        description: '酥脆鸡肉排配上新鲜生菜和香浓蛋黄酱',
        price: '16',
        image: chicken
      },
      {
        id: 304,
        name: '素食汉堡（Veggie Burger）',
        description: '自制素食饼，配以烤蘑菇、鳄梨、生菜和番茄',
        price: '15',
        image: veggie
      },
      {
        id: 305,
        name: '烟熏培根汉堡（Smoky Bacon Burger）',
        description: '经典汉堡加上烟熏培根，搭配烟熏调味酱',
        price: '22',
        image: bacon
      },
      {
        id: 306,
        name: '辣椒汉堡（Spicy Burger）',
        description: '辣味牛肉饼，加上辣椒酱、辣椒片和胡椒奶酪',
        price: '19',
        image: spicy
      },
      {
        id: 307,
        name: 'BBQ风味汉堡（BBQ Burger）',
        description: '特制BBQ酱烤牛肉饼，加上洋葱圈和烟熏奶酪',
        price: '21',
        image: bbq
      },
      {
        id: 308,
        name: '薯条（Fries）',
        description: '',
        price: '10',
        image: fries
      },
      {
        id: 309,
        name: '洋葱圈（Onion Rings）',
        description: '',
        price: '12',
        image: onionrings
      },
      {
        id: 310,
        name: '沙拉（Salad）',
        description: '',
        price: '14',
        image: salad
      },
      {
        id: 311,
        name: '鸡块（Chicken Nuggets）',
        description: '',
        price: '15',
        image: nuggets
      },
      {
        id: 312,
        name: '爆米鸡（Popcorn Chicken）',
        description: '',
        price: '15',
        image: popchicken
      },
      {
        id: 313,
        name: '芬达（Fanta）',
        description: '',
        price: '8',
        image: fanta
      },
      {
        id: 314,
        name: '雪碧（Sprite）',
        description: '',
        price: '8',
        image: sprite
      },
      {
        id: 315,
        name: '可乐（Cola）',
        description: '',
        price: '8',
        image: cola
      },
      {
        id: 316,
        name: '热巧克力（Hot Chocolate）',
        description: '',
        price: '12',
        image: hotchoco
      },
      {
        id: 317,
        name: '冰柠檬红茶（Iced Lemon Black Tea）',
        description: '',
        price: '10',
        image: icedtea
      }
    ],
  },
  {
    id: 4,
    name: '水果吧',
    icon: '/storeIcon4.png',
    items: [
      {
        id: 401,
        name: 'Mixed Fruit Bowl',
        description:'ADD description',
        weight: '1 bowl (Approx. 500 g)',
        price: '12',
        quantity: 1,
        image: mixedFruitBowl,
      },

      {
        id: 402,
        name: '橙片盒 (Sliced Orange Bowl)',
        description: '新鲜多汁的橙片，富含维生素C。',
        weight: '1 bowl (Approx. 500 g)',
        price: '6',
        quantity: 1,
        image: slicedoranges
      },
      {
        id: 403,
        name: '西瓜块盒 (Chopped Watermelon Bowl)',
        description:'甜美的西瓜块，完美解渴。',
        weight:'1 bowl (Approx. 500 g)',
        price:'5',
        quantity: 1,
        image:choppedwatermelon
      },
      {
        id: 404,
        name: '洗净葡萄盒 (Washed Grapes Bowl)',
        description: '一碗新鲜的无籽葡萄，易于食用且富含抗氧化剂。',
        weight: '1 bowl (Approx. 500 g)',
        price: '7',
        quantity: 1,
        image: washedgrapes
      },
      {
        id: 405,
        name: '菠萝盒 (Pineapple Bowl)',
        description: '新鲜切碎的菠萝，味道酸爽，富含有助消化的酵素。',
        weight: '1 bowl (Approx. 500 g)',
        price: '8',
        quantity: 1,
        image: choppedpineapple
      },
      {
        id: 406,
        name: '桃片盒 (Sliced Peach Bowl)',
        description: '多汁甜美的桃片，带有天然的香甜味道和细腻的口感。',
        weight: '1 bowl (Approx. 500 g)',
        price: '7',
        quantity: 1,
        image: slicedpeach
      },
      {
        id: 407,
        name: '奇异果盒 (Kiwi Bowl)',
        description: '切片的奇异果，是维生素C、维生素K和膳食纤维的极佳来源。',
        weight: '1 bowl (Approx. 500 g)',
        price: '9',
        quantity: 1,
        image: slicedkiwi
      },
      // Juices
      {
        id: 408,
        name: '橙汁 (Orange Juice)',
        description: '',
        weight: '300 ml',
        price: '5',
        quantity: 1,
        image: orangejuice
      },
      {
        id: 409,
        name: '胡萝卜汁 (Carrot Juice)',
        description: '',
        weight: '400 ml',
        price: '6',
        quantity: 1,
        image: carrotjuice
      },
      {
        id: 410,
        name: '西瓜汁 (Watermelon Juice)',
        description: '',
        weight: '300 ml',
        price: '5',
        quantity: 1,
        image: watermelonjuice
      },
      {
        id: 411,
        name: '苹果汁 (Apple Juice)',
        description: '',
        weight: '296 ml',
        price: '5',
        quantity: 1,
        image: applejuice
      },
      {
        id: 412,
        name: '菠萝汁 (Pineapple Juice)',
        description: '',
        weight: '330 ml',
        price: '6',
        quantity: 1,
        image: pineapplejuice
      },
      {
        id: 413,
        name: '葡萄汁 (Grape Juice)',
        description: '',
        weight: '355 ml',
        price: '5',
        quantity: 1,
        image: grapejuice
      },
      {
        id: 414,
        name: '芒果汁 (Mango Juice)',
        description: '',
        weight: '250 ml',
        price: '7',
        quantity: 1,
        image: mangojuice
      },
      {
        id: 415,
        name: '草莓汁 (Strawberry Juice)',
        description: '',
        weight: '320 ml',
        price: '7',
        quantity: 1,
        image: strawberryjuice
      },
      // Smoothies
      {
        id: 416,
        name: '芒果香蕉冰沙 (Mango Banana Smoothie)',
        description: '芒果和香蕉的奶油混合，加入一点点酸奶。',
        weight: '300 ml',
        price: '10',
        quantity: 1,
        image: mangobananasmoothie
      },
      {
        id: 417,
        name: '浆果冰沙 (Berry Smoothie)',
        description: '草莓、蓝莓和覆盆子的混合，加入一点苹果汁。',
        weight: '300 ml',
        price: '10',
        quantity: 1,
        image: berrysmoothie
      },
      {
        id: 418,
        name: '绿色蔬菜冰沙 (Green Smoothie)',
        description: '菠菜、青苹果、黄瓜和香蕉的混合，有助于健康提升。',
        weight: '300 ml',
        price: '10',
        quantity: 1,
        image: greensmoothie
      },
      {
        id: 419,
        name: '蜂蜜柠檬冰沙 (Honey Lemon Smoothie)',
        description: '柠檬汁、蜂蜜和一点姜，带来清新舒缓的味道。',
        weight: '300 ml',
        price: '10',
        quantity: 1,
        image: honeylemonsmoothie
      },
      {
        id: 420,
        name: '草莓酸奶冰沙 (Strawberry Yogurt Smoothie)',
        description: '新鲜草莓与奶油酸奶和一点香草的混合。',
        weight: '300 ml',
        price: '10',
        quantity: 1,
        image: strawberryyogurtsmoothie
      },         
    ],
  },

  {
    id: 5,
    name: '中式餐厅',
    icon: '/storeIcon5.png',
    items: [
      // Add items for 中式餐厅 if any
    ],
  },
];

export default storeData;
