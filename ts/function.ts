/*
 * @Author: yangxuefeng yangxuefeng@clinbrain.com
 * @Description:
 */

{
  // 书写完整函数类型
  let myAdd: (x: number, y: number) => number = function (
    x: number,
    y: number
  ): number {
    return x + y;
  };
  // 推断类型(在**赋值**语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：)
  let myAdd2 = function (x: number, y: number): number {
    return x + y;
  };

  let myAdd3: (baseValue: number, increment: number) => number = function (
    x,
    y
  ) {
    return x + y;
  };

  function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
  }
}

{
  // 函数重载
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x: { suit: string; card: number }[]): number;
  function pickCard(x: number): { suit: string; card: number };
  function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
  ];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  let pickedCard2 = pickCard(15);
  alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

//   注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用pickCard会产生错误。
}
