// 继承
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    // console.log("[ this ]", this);  在构造函数里访问this的属性之前，我们一定要调用super()。 这个是TypeScript强制执行的一条重要规则。
    super(name);
    console.log("[ this ]", this);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();

{
  // 公共，私有与受保护的修饰符
  // 1. public
  class Animal {
    public name: string;
    public constructor(theName: string) {
      this.name = theName;
    }
    public move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }

  // 2. private 当成员被标记成private时，它就不能在声明它的类的外部访问。比如
  class Animal2 {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  // new Animal("Cat").name; // 错误: 'name' 是私有的.

  // 3. protected protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在**派生类**中仍然可以访问
  // 构造函数也可以被标记成protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
  class Person {
    protected name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Howard", "Sales");
  console.log(howard.getElevatorPitch());
  // console.log(howard.name); // 错误

  // 4. readonly修饰符
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
      this.name = theName;
    }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  // dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

  // public: 默认
  // private: 当成员被标记成private时，它就不能在声明它的类的外部访问。
  // protected: protected成员在**派生类**中仍然可以访问
  // readonly: 只读属性,必须在声明时或构造函数里被初始化
}

{
  // 存取器
  // TypeScript支持通过getters/setters来截取对对象成员的访问
  // 静态属性 static
}

{
  // 抽象类
  abstract class Animal {
    abstract makeSound(): void;
    move(): void {
      console.log("roaming the earch...");
    }
  }
  
  abstract class Department {
    constructor(public name: string) {}

    printName(): void {
      console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
    // abstract generateReports(): void; // 必须在派生类中实现
  }

  class AccountingDepartment extends Department {
    constructor() {
      super("Accounting and Auditing"); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
      console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
      console.log("Generating accounting reports...");
    }
  }

  let department: Department; // 允许创建一个对抽象类型的引用
//   department = new Department(); // 错误: 不能创建一个抽象类的实例
  department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
  department.printName();
  department.printMeeting();
//   department.generateReports(); // 错误: 方法在声明的抽象类中不存在
}
