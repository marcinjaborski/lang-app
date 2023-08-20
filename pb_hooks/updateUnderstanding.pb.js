routerAdd("POST", "/hooks/updateUnderstanding", (c) => {
  const data = $apis.requestInfo(c).data;
  const records = $app.dao().findRecordsByIds("terms", data.terms);
  records.forEach((record) => {
    if (!record) return;
    const form = new RecordUpsertForm($app, record);
    form.loadData({
      understanding: record.get("understanding") + 1,
    });
    try {
      form.submit();
    } catch (ignore) {}
  });

  return c.noContent(200);
});
