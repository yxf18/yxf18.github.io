// 1 泛型- 带参数的类型

{
  function identity<Type>(arg: Type): Type {
    return arg;
  }

  let myIdentity: <Type>(arg: Type) => Type = identity;
}

{
  interface GenericIdentityFn<Type> {
    (arg: Type): Type;
  }
  const obj: GenericIdentityFn<number> = (arg) => arg;
}

{
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
  }
  //   loggingIdentity(3);

  {
    // 在通用约束中使用类型参数
    function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
      return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a");
    getProperty(x, "m");
  }
}
// 2 Keyof 类型运算符- 使用keyof运算符创建新类型
// 3 Typeof 类型运算符- 使用typeof运算符创建新类型
// 4 索引访问类型- 使用Type['a']语法访问类型的子集
// 5 条件类型- 类似于类型系统中 if 语句的类型
// 6 映射类型- 通过映射现有类型中的每个属性来创建类型
// 7 模板文字类型- 通过模板文字字符串更改属性的映射类型
