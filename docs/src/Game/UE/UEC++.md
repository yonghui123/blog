---
title: UEC++基础知识
date: 2024-05-25
cover: img/unreal/unreal.jpg
categories:
  - UE
tags:
  - GAME
  - cpp
description: 详细介绍在UE中C++的基础知识
---

## 虚幻对象继承结构

Object
游戏对象顶层类，所有对象都继承于 Object，但是只用于存放数据，不能放置到场景中
Actor
继承于 Object 类，能放置在场景中最底层的类，有视觉表现，可以被看到
Pawn
继承于 Actor 的类，有基础的控制器，上下左右移动等
Character
继承于 Pawn 的类，具有适合角色的封装好的一系列功能

## 虚幻中场景类包含关系

Package
顶层类，每一个包中包含一个 Word
World
场景世界，包含一个或多个关卡 Level
Level
关卡类，包含一个或多个角色或物体
Actor
每一个角色或者物体会包含一个或多个 Component

## c++ 认识 Object

基础宏参
c++脚本映射到蓝图：
UCLASS(Blueprintable)
增加蓝图可编辑的变量
UPROPERTY(BlueprintReadWrite)
float num;
增加蓝图可调用函数
UFUNCTION(BlueprintCallable)
valid Func();

## c++ 认识 Actor

#### 三个基础方法

AMyActor: 构造方法
BeginPlay: 当游戏开始运行时调用的
Tick: 每帧调用的方法，DeltaTime 每帧运行时间

#### Actor 设置

SetActorLocation:设置 actor 的位置
GetActorLocation：获取 Actor 的位置
AddActorLocalOffset(FVector): 移动 Actor

FMath 数学库

#### 自定义类的命名

继承于 Actor 的类带有 A 前缀
继承于 Object 的类带有 U 前缀
枚举 Enums 类型通常带有 E 前缀
Interface 接口的前缀通常是 I
Template 模板类的前缀通常是 T
UE 中的 UI 库 SWidget 带有前缀 S
其他类的前缀为 F，如 FVector

#### 碰撞（Collision）和物理系统（Physics）

简单碰撞： 自定义组件的碰撞边界
复杂碰撞： 根据组件的形状来确定碰撞边界

设置物体的力和力矩, 需要手动引入
\#include "Components/StaticMeshComponent.h"

StaticMesh->AddForce(FVector)
StaticMesh->AddTorque

## c++ 认识 Pown

基础展示
UCameraComponent: 相机实例，并将实例挂载到根实例上与 Actor 一样
SetRelativeLocation(FVector) 设置位置
SetRelativeRotation(FRotator) 设置旋转位置

基础方法与 Actor 一样
额外增加输入组件
SetupPlayerInputComponent(UInputComponent)
UInputComponent.BindAxis(EventStr, this, BindFunc); 绑定轴向操作
UInputComponent.BindAction(EventStr, this, BindFunc); 绑定瞬时操作

移动 Acto
AddActorLocalOffset();
旋转 Actor
//绕轴旋转 X, Y, Z
// Row, Pitch Yaw
1）FRotator Rotation = SpringArm->GetComponentRotation();
Rotation.Pitch = float;
SpringArm->SetWorldRotation(FRotator)

2\)bUseControllerRotationYaw = true; // 直接使用已经定义好的旋转控制器
AddControllerYawInput(MouseInput.X);

## c++ 认识 character

#### 获取模型

从[mixamo](https://www.mixamo.com/#/)获取模型的骨骼动画和动画混合

#### 创建自己的 character

1.  使用 springarmcomponent 实现第三人称视角
    将 camera(相机)和 actor(人物)分别悬挂在 springarm 的两侧实现相机始终跟随人物的效果

```cpp
// MainPlayer.h
// 创建悬臂
UPROPERTY(VisibleAnywhere, BlueprintReadOnly)
class USpringArmComponent* SpringArm;
// 跟随的相机
UPROPERTY(VisibleAnywhere, BlueprintReadOnly)
class UCameraComponent* Camera;

// 按键处理事件
void MoveForward(float value);

void MoveRight(float value);



// #MainPlayer.cpp
// 需要引入SpringArmComponent和camera的头文件 从https://docs.unrealengine.com/5.3/en-US/查找

// 创建组件
SpringArm = CreateDefaultSubobject<USpringArmComponent>("SpringArm");
// 挂载组件
SpringArm->SetupAttachment(GetRootComponent())
// 设置悬臂长度
SpringArm->TargetArmLength = 600.0f;

// 创建组件
SpringArm = CreateDefaultSubobject<USpringArmComponent>("SpringArm");
// 挂载组件
SpringArm->SetupAttachment(SpringArm, USpringArmComponent::SocketName);
// USpringArmComponent::SocketName 弹簧臂内置一个特殊的插槽，可供我们添加对象，这样就不必将对象直接添加到组件的根节点上。
// 设置碰撞胶囊体大小
GetCapsuleComponent()->SetCapsuleSize(35.0f, 100.0f);

// 镜头旋转的时候，角色不跟着相机旋转而旋转
bUseControllerRotationYaw = false;
bUseControllerRotationPitch = false;
bUseControllerRotationRow = false;

void AMainPlayer::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    // 继承父类的事件方法
    Super::SetupPlayerInputComponent();
    // UE中的宏方法，用于检测是否是空指针
    check(PlayerInputComponent);
    // 绑定轴事件, 事件函数自定义
    PlayerInputComponent->BindAxis("MoveForward", this, &AMainPlayer::MoveForward);
    // 绑定轴事件，事件函数使用系统自定义
    PlayerInputComponent->BindAxis("Turn", this, &ACharacter::AddControllerYawInput)

    // 绑定按键事件
    PlayerInputComponent->BindAction("Jump", this, &AMainPlayer::Jump);
}

void AMainPlayer::MoveForward(float value)
{
    // Pawn类继承的移动函数, GetActorForward获取当前人物的正前方
    // AddMovementInput(GetActorForward(), value);

}
```

重新设置 GameMode 中的 DefaultPawn 为自定义的 MainPalyer，再将自定义的 GameMode 挂载到当前的 Level 中

## c++ 宏参基础属性

UCLASS

UPROPERTY
UPROPERTY 宏参参数 1
EditAnyWhere 在蓝图原型以及实例对象中都可以修改
VisibleAnyWhere 在蓝图原型以及实例对象中可以查看
EditInstanceOnly 仅在实例对象中修改
VisibleInstanceOnly 仅在实例对象中查看
EditDefaultsOnly 仅在属性窗口可以编辑
VisibleDefaultsOnly 仅在属性窗口中查看
BlueprintReadOnly 在蓝图脚本中只读，在蓝图中使用只有 get 方法
BlueprintReadWrite 在蓝图脚本中可读可写，在蓝图中使用其 get 和 set 方法
BlueprintCallable 针对 UFUNCTION 宏的参数，表示该函数可以在蓝图中进行调用，该函数会在每次一蓝图调用的时候调用
BlueprintPure pure 函数必须有返回值，该函数会在每一次需要该函数返回值的时候调用
BlueprintImplementableEvent 创建一个蓝图中可以调用的事件，不需要实现函数，在蓝图中实现，在 cpp 中调用
BlueprintNativeEvent cpp 中实现\_Implementable 版本，UHT 中实现原版实现，在蓝图中调用时，会调用原版实现，需要调用 cpp 中实现的版本的话可以通过 parent 来调用
UPROPERTY 宏参参数 2
Category 自定义分类
UPROPERTY 宏参参数 3 限制最大最小值
meta = (ClampMin, ClampMax, UIMin, UIMax)
