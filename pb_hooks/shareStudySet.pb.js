routerAdd("PATCH", "/hooks/shareStudySet", (c) => {
  const data = $apis.requestInfo(c).data;
  const { user, studySet } = data;
  const originalStudySet = $app.dao().findRecordById("studySets", studySet);
  const originalTerms = $app.dao().findRecordsByIds("terms", originalStudySet.get("terms"));
  const studySetsCollection = $app.dao().findCollectionByNameOrId("studySets");
  const termsCollection = $app.dao().findCollectionByNameOrId("terms");

  const newTerms = originalTerms.map((term) => {
    if (!term) return;
    const newTerm = new Record(termsCollection, {
      base: term.get("base"),
      translation: term.get("translation"),
      understanding: 0,
      owner: user,
    });
    $app.dao().saveRecord(newTerm);
    return newTerm.id;
  });

  const newStudySet = new Record(studySetsCollection);
  const studySetForm = new RecordUpsertForm($app, newStudySet);
  studySetForm.loadData({
    title: originalStudySet.get("title"),
    sharedId: originalStudySet.get("sharedId"),
    owner: user,
    terms: newTerms,
  });
  studySetForm.submit();

  return c.noContent(200);
});
