# Model Parent-Child Structure

以下树边只表示 `@useChild` 建立的真实所有权，不表示目录或继承关系。`[]`
表示子模型数组，`?` 表示可选子模型。

```text
GameModel - 游戏根模型，直接拥有所有顶层领域模型。
├── CalendarModel - 管理半天粒度的时间、日期、年份和季节。
├── EventsModel - 管理当前玩法事件并支持整体清空。
│   └── EventModel[] - 每个事件由 EventsModel 直接拥有。
├── RolesModel - 管理当前角色集合和角色生存流程。
│   └── RoleModel[] items - 每个角色由 RolesModel 直接拥有，并提供名称与描述。
│       ├── AssetsModel - 管理该角色随身携带的物资。
│       │   └── AssetModel[] - 每件随身物资由角色的 AssetsModel 直接拥有。
│       │       ├── AssetNutritionModel? - 可选地记录物资提供的营养。
│       │       └── AssetFreshnessModel? - 可选地记录物资当前的新鲜度。
│       ├── RoleAttrsModel - 管理角色拥有的属性模型。
│       │   ├── RoleGatheringModel - 记录角色的采集能力。
│       │   └── RoleStrengthModel - 记录角色的力量属性。
│       ├── RoleStateModel - 管理角色拥有的状态模型。
│       │   ├── RoleSatietyModel - 记录角色当前的饱腹状态。
│       │   └── RoleVitalityModel - 记录角色生命值并执行死亡检查。
│       ├── TraitsModel - 管理角色拥有的全部特质。
│       │   └── RoleTraitModel[] - 保存角色特质，并默认包含一个 RoleStarvationModel。
├── AssetsModel - 管理游戏共享的有序物资集合。
│   └── AssetModel[] - 每件共享物资由游戏的 AssetsModel 直接拥有。
│       ├── AssetNutritionModel? - 可选地记录物资提供的营养。
│       └── AssetFreshnessModel? - 可选地记录物资当前的新鲜度。
├── RegionsModel - 管理游戏中的具名区域。
│   ├── RefugeModel - 表示幸存者所在的避难所。
│   └── ForestModel - 表示可供活动和采集的森林。
│       └── TraitsModel - 管理森林拥有的全部特质。
│           └── TraitModel[] - 保存森林特质，并默认包含 WildFruitSeasonTraitModel。
└── TasksModel - 管理当前生效并随时间推进的任务。
    └── TaskModel[] - 每个任务由 TasksModel 直接拥有。
        ├── TraitsModel - 管理能够修改该任务的特质。
        │   └── TaskTraitModel[] - 保存由 TaskModel 输入的任务特质。
        └── TaskPriorModel - 记录任务优先级。
```

`RoleModel.task`、`TaskModel.roles` 等 `@useRef` 字段只是引用，不形成父子关系，
因此不出现在上面的所有权树中。

## Inheritance

以下树仅补充类继承关系，不代表模型实例之间的父子关系。

```text
AttrModel - 为数值属性提供 origin、offset 和 current。
├── AssetNutritionModel - 表示物资能够提供的营养。
├── RoleGatheringModel - 表示角色的采集能力。
├── RoleStrengthModel - 表示角色的力量属性。
├── RoleVitalityModel - 表示角色生命值并执行死亡检查。
└── TaskPriorModel - 表示任务优先级。

AssetModel - 定义名称、营养和新鲜度能力的物资抽象基类。
├── BreadModel - 表示具有 5 点营养和 60 点新鲜度的面包。
├── FruitBasketModel - 表示不提供营养的采集果篮。
├── MeatModel - 表示具有 5 点营养和 10 点新鲜度的肉。
└── RaspberryModel - 表示具有 3 点营养和 5 点新鲜度的树莓。

EventModel - 定义名称和描述信息的玩法事件抽象基类。
└── WildFruitSeasonEventModel - 描述野果季并创建采集任务。

RegionModel - 定义游戏世界地点的区域抽象基类。
├── RefugeModel - 表示幸存者所在的避难所。
└── ForestModel - 表示可供活动和采集的森林。

TaskModel - 定义角色绑定、任务特质、优先级和推进方法的任务抽象基类。
└── WildFruitSeasonTaskModel - 每次推进时为每名已绑定角色产出一个树莓。

TraitModel - 定义可启用或停用的行为特质抽象基类。
├── RoleTraitModel - 增加所属角色和角色群路由。
│   └── RoleStarvationModel - 根据饱腹度累计饥饿等级并降低生命值。
├── TaskTraitModel - 增加所属任务路由。
└── WildFruitSeasonTraitModel - 在时间推进后按日期向游戏添加野果季事件。
```
