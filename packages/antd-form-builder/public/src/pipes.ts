export const pipes1 = [
  (ctx) => {
    const { form, meta } = ctx;
    const showHobby = form.getFieldValue('show-hobby');
    const hasHobbies = ctx.find('hobbies');
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
      meta.fields = ctx.where((item) => item.key !== 'hobbies');
    }
    return ctx;
  }
];
