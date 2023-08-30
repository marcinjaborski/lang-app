routerAdd("POST", "/hooks/updateNoteTerms", (c) => {
  const data = $apis.requestInfo(c).data;
  const separator = $app
    .dao()
    .findRecordsByExpr("settings", $dbx.exp("user = {:user}", { user: $apis.requestInfo(c).authRecord.id }))[0]
    .get("separator");
  const note = $app.dao().findRecordById("notes", data.note);
  const oldTerms = $app.dao().findRecordsByExpr("terms", $dbx.exp("note = {:note}", { note: note.id }));
  const newTerms = data.terms;
  const termsToDelete = oldTerms.filter((oldTerm) => !newTerms.find((newTerm) => newTerm.id === oldTerm.id));
  termsToDelete.forEach((term) => $app.dao().deleteRecord(term));
  oldTerms.forEach((oldTerm) => {
    if (!oldTerm) return;
    const newTerm = newTerms.find((newTerm) => newTerm.id === oldTerm.id);
    if (!newTerm) return;
    const [newBase, newTranslation] = newTerm.text.split(separator);
    if (!newTranslation) {
      $app.dao().deleteRecord(oldTerm);
    }
    oldTerm.set("base", newBase);
    oldTerm.set("translation", newTranslation);
    $app.dao().saveRecord(oldTerm);
  });

  return c.noContent(200);
});
