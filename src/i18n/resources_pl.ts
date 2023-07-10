import { Resource } from "./types";

export const pl: Resource = {
  navbar: {
    login: "Zaloguj",
    logout: "Wyloguj",
    settings: "Ustawienia",
  },
  home: {
    hello: "Cześć",
    emptyText: "Nie ma na razie żadnych modułów, spróbuj stworzyć jeden!",
    createButton: "Stwórz",
    delete: "Usuń",
  },
  login: {
    loginTabTitle: "Logowanie",
    registerTabTitle: "Rejestracja",
    usernameOrEmailRequired: "Nazwa użytkownika lub hasło są wymagane",
    usernameOrEmailLabel: "Nazwa użytkownika lub adres email",
    passwordLabel: "Hasło",
    passwordRequired: "Hasło jest wymagane",
    passwordLengthMessage: "Hasło musi mieć conajmniej 8 znaków",
    loginButton: "Zaloguj",
    usernameLabel: "Nazwa użytkownika",
    usernameInvalid: "Nazwa użytkownika nie może zawierać spacji",
    emailLabel: "Email",
    emailRequired: "Email jest wymagany",
    emailInvalid: "Wprowadź poprawny email",
    confirmPasswordLabel: "Potwierdź hasło",
    confirmPasswordRequired: "To pole jest wymagane",
    confirmPasswordNoMatch: "Hasła się nie zgadzają",
    registerButton: "Zarejestruj się",
    "Failed to authenticate.": "Nazwa użytkownika lub hasło są nieprawidłowe",
    "Failed to create record.": "Email lub nazwa użytkownika są już w użyciu",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  notFound: {
    title: "Oops! Nie znaleziono strony",
    notLoggedText: "Spróbuj się zalogować",
    login: "Logowanie",
  },
  createModuleDialog: {
    title: "Stwórz nowy moduł",
    textFieldLabel: "Nazwa",
    cancel: "Anuluj",
    create: "Stwórz",
    "Failed to create record.": "Nazwa nie może być pusta",
    "Failed to authenticate.": "",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  noteDrawer: {
    baseLang: "Bazowy",
    targetLang: "Docelowy",
    module: "Moduł",
    excerpt: "Opis",
    save: "Zapisz",
  },
  noteEditor: {
    placeholder: "Zacznij pisać...",
  },
  noteToolbar: {
    term: "Stwórz słówko",
    translate: "Przetłumacz tekst",
    bold: "Pogrubienie",
    italic: "Kursywa",
    underline: "Podkreślenie",
    title: "Tytuł",
    subtitle: "Podtytuł",
    alignLeft: "Wyrównaj do lewo",
    center: "Wyśrodkuj",
    alignRight: "Wyrównaj do prawo",
    justify: "Justowanie",
    ul: "Lista punktowana",
    ol: "Lista numerowana",
  },
  feedback: {
    created: "Utworzono",
    updated: "Zapisano",
    deleted: "Usunięto",
    "Failed to create record.": "Nie można było utworzyć",
    "Failed to authenticate.": "Ten użytkownik nie istnieje",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  settings: {
    title: "Ustawienia",
    userLanguage: "Język aplikacji",
    separator: "Rozdzielacz słówka",
    defaultBaseLang: "Domyślny język bazowy",
    defaultTargetLang: "Domyślny język tłumaczeń",
    save: "Zapisz",
    updated: "Zapisano ustawienia",
  },
};
