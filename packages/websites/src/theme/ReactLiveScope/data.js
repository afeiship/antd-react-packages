export const items1 = [
  { value: "v1", label: "l1" },
  { value: "v2", label: "l2" },
  { value: "v3", label: "l3" },
];

// generate v1 - v9
export const items2 = [
  { value: "v1", label: "content1", key: "k1", chosen: false },
  { value: "v2", label: "content2", key: "k2", chosen: true },
  { value: "v3", label: "content3", key: "k3", chosen: false },
  { value: "v4", label: "content4", key: "k4", chosen: false },
  { value: "v5", label: "content5", key: "k5", chosen: false },
  { value: "v6", label: "content6", key: "k6", chosen: false },
  { value: "v7", label: "content7", key: "k7", chosen: false },
];

export const items3 = [
  { value: "s1", label: "Status1" },
  { value: "s2", label: "Status2" },
  { value: "s3", label: "Status3" },
];

export const items4 = [
  {
    label: "0-0",
    value: "0-0",
    children: [
      {
        label: "0-0-0",
        value: "0-0-0",
        children: [
          { label: "0-0-0-0", value: "0-0-0-0" },
          { label: "0-0-0-1", value: "0-0-0-1" },
          { label: "0-0-0-2", value: "0-0-0-2" },
        ],
      },
      {
        label: "0-0-1",
        value: "0-0-1",
        children: [
          { label: "0-0-1-0", value: "0-0-1-0" },
          { label: "0-0-1-1", value: "0-0-1-1" },
          { label: "0-0-1-2", value: "0-0-1-2" },
        ],
      },
      {
        label: "0-0-2",
        value: "0-0-2",
      },
    ],
  },
  {
    label: "0-1",
    value: "0-1",
    children: [
      { label: "0-1-0-0", value: "0-1-0-0" },
      { label: "0-1-0-1", value: "0-1-0-1" },
      { label: "0-1-0-2", value: "0-1-0-2" },
    ],
  },
  {
    label: "0-2",
    value: "0-2",
  },
];

export const items_pics = [
  {
    uid: 1,
    url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    status: "done",
  },
  {
    uid: 2,
    url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    status: "done",
  },
];

export const pipes1 = [
  (ctx) => {
    const { form, meta } = ctx;
    const showHobby = form.getFieldValue("show-hobby");
    const hasHobbies = ctx.find("hobbies");
    if (showHobby) {
      if (!hasHobbies) {
        meta.fields.push({
          key: "hobbies",
          widget: "checkbox-group",
          label: "Hobbies",
          options: ["football", "basketball", "swimming"],
        });
      }
    } else {
      meta.fields = ctx.where((item) => item.key !== "hobbies");
    }
    return ctx;
  },
];
