interface SomeType {
  readonly prop: { name: string; age: number };
}
// 可以修改prop内部属性，不能重写prop
function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop.age++;

  //   obj.prop = {
  //     name: "Victor the Evictor",
  //     age: 42,
  //   };
  //   Cannot assign to 'prop' because it is a read-only property.
}

{
  interface Person {
    name: string;
    age: number;
  }

  interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
  }

  let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
  };

  // works
  let readonlyPerson: ReadonlyPerson = writablePerson;

  console.log(readonlyPerson.age); // prints '42'
  writablePerson.age++;
  console.log(readonlyPerson.age); // prints '43'
}

{
  type NumberDictionary = {
    // name: string; // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
    [index: string]: number;
    length: number; // ok
  };
}

{
  interface Colorful {
    color: string;
  }
  interface Circle {
    radius: number;
  }

  type ColorfulCircle = Colorful & Circle;
  function draw(circle: Colorful & Circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
  }

  // okay
  draw({ color: "blue", radius: 42 });

  // oops
  //   draw({ color: "red", raidus: 42 });
}

{
  interface Box<Type> {
    contents: Type;
  }
  interface StringBox {
    contents: string;
  }

  let boxA: Box<string> = { contents: "hello" };
  boxA.contents;

  let boxB: StringBox = { contents: "world" };
  boxB.contents;
}
