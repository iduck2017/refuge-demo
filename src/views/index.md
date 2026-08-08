# View Structure

以下树边表示 `@useChild` 建立的真实视图所有权。子 View 的 Phaser
`Container` 会自动挂载到父 View 的 `Container`。

```text
AppView - 根视图，负责固定比例舞台、背景和四个主要区域的布局。
├── IllustrationView - 显示左上方的插画面板，目前只有边框占位。
├── WorkbenchView - 显示左下方的工作台面板，目前只有边框占位。
├── TeamView - 显示右上方固定六列的角色头像区域。
│   └── RoleAvatarView[6] - 显示单个角色头像槽位，目前只有边框占位。
└── InventoryView - 显示右下方六列的共享物资网格。
    └── AssetView[] - 显示单个可拖拽物资槽位及其物资名称。
```

## Model Bindings

```text
AppView
└── AssetsModel - 由构造参数接收并传递给 InventoryView。

InventoryView
└── AssetsModel - 通过 @useRef 引用共享物资集合，并消费 AssetsChangedFrame。

AssetView
└── AssetModel? - 通过 @useRef 引用当前槽位显示的物资。

TeamView - 当前未绑定 RolesModel，只创建六个固定 RoleAvatarView。
RoleAvatarView - 当前未绑定 RoleModel。
IllustrationView - 当前未绑定 Model。
WorkbenchView - 当前未绑定 Model。
```

## Base View

```text
View - 所有视图的抽象基类，拥有一个 Phaser Container。
├── add() - 将 Phaser Game Object 加入当前 Container。
├── createView() - 使用同一个 Phaser Scene 创建子 View。
├── handleParentChange() - 根据 set-piece 父子关系同步 Container 挂载位置。
└── destroy() - 递归销毁子 View 和当前 Container。
```

`AppView.isRootView` 返回 `true`，因此它会直接挂载到 Phaser Scene；
其他 View 只有成为某个 View 的子模型后才会显示。
