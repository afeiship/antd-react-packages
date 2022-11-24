export const pipes1 = [
  (ctx) => {
    const { form, meta } = ctx;
    console.log(form, meta);
    // find key: show-hobby from meta
    // if show-hobby is true, then show hobby field
    // const field = meta.fields.find((item) => item.key === 'show-hobby');
    const showHobby = form.getFieldValue('show-hobby');
    const hasHobbies = meta.fields.find((item) => item.key === 'hobbies');
    if (showHobby) {
      if (!hasHobbies) {
        meta.fields.push({
          key: 'hobbies',
          widget: 'checkbox-group',
          label: 'Hobbies',
          options: ['football', 'basketball', 'swimming']
        });
      }
    } else {
      meta.fields = meta.fields.filter((item) => item.key !== 'hobbies');
    }
    return ctx;
  }
];
