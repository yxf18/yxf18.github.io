
interface LabelledValue {
    label: string;
  }
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }
  
  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj);
  
  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  /* 
  ro[0] = 12; // error!
  ro.push(5); // error!
  ro.length = 100; // error!
  a = ro; // error! 
  */
  
  a = ro as number[];
  
  interface SquareConfig {
    color?: string;
    width?: number;
  }
  
  function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
    return { color: "red", area: 100 };
  }
  let obj = { width: 100, opacity: 0.5 };
  // let mySquare = createSquare({ width: 100, opacity: 0.5 });
  let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
  // let mySquare = createSquare(obj);
  
  {
    //函数类型
    interface SearchFunc {
      (source: string, subString: string): boolean;
    }
  
    let mySearch: SearchFunc;
    mySearch = function (source: string, subString: string) {
      let result = source.search(subString);
      return result > -1;
    };
  }
  
  {
    // 类类型
    // 实现接口
    interface ClockInterface {
      currentTime: Date;
      setTime(d: Date);
    }
  
    class Clock implements ClockInterface {
      currentTime: Date;
      setTime(d: Date) {
        this.currentTime = d;
      }
      constructor(h: number, m: number) {}
    }
  }
  
  {
    // 继承接口
    interface Shape {
      color: string;
    }
  
    interface PenStroke {
      penWidth: number;
    }
  
    interface Square extends Shape, PenStroke {
      sideLength: number;
    }
  
    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;
  }
  
  {
    // 混合类型
    interface Counter {
      (start: number): string;
      interval: number;
      reset(): void;
    }
  
    function getCounter(): Counter {
      let counter = <Counter>function (start: number) {};
      counter.interval = 123;
      counter.reset = function () {};
      return counter;
    }
  
    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
  }
  
  {
    // 接口继承类
    // 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，
    // 但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。
    // 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被**这个类或其子类**所实现（implement）。
    class Control {
      private state: any;
    }
  
    interface SelectableControl extends Control {
      select(): void;
    }
  
    class Button extends Control implements SelectableControl {
      select() {}
    }
  
    class TextBox extends Control {}
  
    // Error: Property 'state' is missing in type 'Image'.
  //   class Image implements SelectableControl {
  //     select() {}
  //   }
  
    class Location {}
  }
  