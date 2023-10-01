import { Resource } from "./types";

export const pl: Resource = {
  navbar: {
    login: "Zaloguj",
    logout: "Wyloguj",
    profile: "Profil",
    settings: "Ustawienia",
    home: "Strona główna",
    newNote: "Stwórz nową notatkę",
    lastNote: "Ostatnia notatka",
    study: "Nauka",
  },
  home: {
    hello: "Cześć",
    emptyText: "Nie ma na razie żadnych modułów, spróbuj stworzyć jeden!",
    createButton: "Stwórz",
    delete: "Usuń",
    createNote: "Utwórz notatkę w tym module",
    update: "Zmień nazwę",
    newNoteName: "Notatka",
    shared: "Udostępnione notatki",
    nonEmptyModule: "Nie można usunąć modułu z notatkami",
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
    "Failed to create record.": "Nie udało się stworzyć konta, spróbuj inną nazwę użytwkonika lub email",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  profile: {
    points: "{{points}} punktów",
    public: "Profil publiczny",
    newFriend: "Nowy znajomy",
    error: "Nie można było pobrać profilu użytkownika",
  },
  notFound: {
    title: "Oops! Nie znaleziono strony",
    notLoggedText: "Spróbuj się zalogować",
    login: "Logowanie",
  },
  createModuleDialog: {
    title: {
      create: "Stwórz nowy moduł",
      update: "Nowa nazwa",
    },
    textFieldLabel: "Nazwa",
    cancel: "Anuluj",
    confirm: {
      create: "Stwórz",
      update: "Zapisz",
    },
    "Failed to create record.": "Nazwa nie może być pusta",
    "Failed to authenticate.": "",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  createNoteDialog: {
    title: "Stwórz nową notatkę",
    module: "Moduł",
    cancel: "Anuluj",
    create: "Stwórz",
    newNoteName: "Notatka",
    "Failed to create record.": "Wybierz moduł",
    "Failed to authenticate.": "",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  noteDrawer: {
    baseLang: "Bazowy",
    targetLang: "Docelowy",
    module: "Moduł",
    excerpt: "Opis",
    share: "Udostępnij",
    noUser: "Nie znaleziono użytkownika",
    save: "Zapisz",
  },
  noteEditor: {
    placeholder: "Zacznij pisać...",
    termAlreadyExists: "Takie słówko już istnieje w tej notatce",
    update: "Zaktualizuj",
    delete: "Usuń",
    cancel: "Anuluj",
    confirmDelete: "Confirm delete",
  },
  createTermDialog: {
    title: "Stwórz słówko",
    base: "Słówko",
    translation: "Tłumaczenie",
    translate: "Przetłumacz",
    cancel: "Anuluj",
    create: "Utwórz",
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
    saved: "Zapisano",
    updated: "Zapisano",
    deleted: "Usunięto",
    updatedTags: "Zaktualizowano tagi",
    understandingUpdated: "Zrozumienie słówek zostało zaktualizowane",
    avatarChanged: "Awatar został zaktualizowany",
    avatarError: "Nie można było zaktualizować awataru",
    profileUpdate: "Profil zapisany",
    profileError: "Nie można było zapisać profilu",
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
    newTag: "Dodaj nowy tag",
    tagExists: "Ten tag już istnieje",
    save: "Zapisz",
    updated: "Zapisano ustawienia",
  },
  study: {
    title: "Zestawy do nauki",
    terms: "słówek",
    flashcards: "Fiszki",
    flashcardsHeader: "Fiszka {{current}} z {{all}}",
    quiz: "Quiz",
    result: "{{result}} poprawnych odpowiedzi",
    endQuiz: "Sprawdź odpowiedzi",
    shared: "Udostępione",
    noTerms: "Ten zestaw nie zawiera żadnych słówek",
    matchGame: "Dopasuj",
    leaderboards: "Tabela wyników",
    shareDialog: {
      title: "Udostępnij zestaw",
      shareTo: "Nazwa użytkownika",
      share: "Udostępnij",
      close: "Zamknij",
      noUser: "Nie znaleziono użytkownika",
    },
    deleteDialog: {
      title: "Czy na pewno chcesz usunąć ten zestaw?",
      cancel: "Anuluj",
      delete: "Usuń",
    },
  },
  studySetCreate: {
    title: "Stwórz zestaw do nauki",
    setTitle: "Nazwa",
    all: "Wszystkie słówka",
    module: "Z modułu",
    note: "Z notatki",
    filters: "Filtry",
    includeTags: "Zawiera tylko słówka z tagami",
    excludeTags: "Wyklucz słówka z tagami",
    summary: "Ten set zawieta {{terms}} słówek",
    cancel: "Anuluj",
    create: "Stwórz",
    emptyTitle: "Nazwa nie może być pusta",
    selectModule: "Wybierz moduł z listy",
    selectNote: "Wybierz notatkę z listy",
    noTerms: "Nie można stworzyć zestawu bez słówek",
  },
  leaderboards: {
    title: "Wyniki",
    user: "Użytkownik",
    game: "Gra",
    date: "Data",
    score: "Wynik",
  },
};
