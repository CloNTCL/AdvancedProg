import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Détecte automatiquement la langue du navigateur
  .use(initReactI18next) // Initialise React-i18next
  .init({
    resources: {
      en: {
        translation: {
          header: {
            logout: "Logout",
            language: "Language",
          },
          modules: {
            title: "Modules",
            searchPlaceholder: "Search for modules...",
            evaluated: "Currently Being Evaluated or Evaluated",
            notEvaluated: "Not Evaluated",
            code: "Code",
            startDate: "Course Start Date",
            endDate: "Course End Date",
            viewResults: "View Results",
            createEvaluation: "Create Evaluation",
            noEvaluated: "No modules are currently being evaluated.",
            noToEvaluate: "No modules to evaluate.",
          },
          loading: "Loading...",
          error: "Error",
          resultsPage: {
            title: "Results for Course: {{courseId}}",
            detailsSubtitle: "Details of all answers",
          },
          table: {
            question: "Question",
            response: "Response",
          },
          noResults: "No results available.",
          noResponses: "No responses yet.",
          errorR: {
            generic: "An error occurred",
            failedToFetchCourses: "Failed to fetch courses",
            failedToFetchResults: "Failed to fetch survey results",
            courseNotFound: "Course not found",
            courseNotAssigned: "This course does not exist or is not assigned to you.",
          },
          questions: {
            amountOfWork: "Rate the amount of work you did during this course",
            levelOfInvolvement: "Rate your level of involvement in the activities of this course",
            practicalKnowledge: "How much practical knowledge have you gained from this course?",
          },
          studentHome: {
            greeting: "Hello {{fullName}}, here are your evaluations",
            ongoingEvaluations: "Ongoing Evaluations",
            pastEvaluations: "Past Evaluations",
            courseCode: "Code",
            startEvaluation: "Start Evaluation",
            noOngoingEvaluations: "No ongoing evaluations available.",
            noPastEvaluations: "No past evaluations found.",
          },
          errorS: {
            generic: "An error occurred",
            failedToFetchCourses: "Failed to fetch evaluations",
          },
          teacherHome: {
            greeting: "Hello {{fullName}}, Here are your courses",
            allCourses: "All Courses",
            evaluatingCourses: "Courses Being Evaluated Or Already Evaluated",
            courseCode: "Code",
            startDate: "Start Date",
            endDate: "End Date",
            viewDetails: "View Details and Evaluation Statistics",
            noCourses: "No courses found.",
            noEvaluatingCourses: "No courses currently being evaluated.",
          },
          loadingT: "Loading courses...",
          errorT: {
            generic: "An error occurred",
            failedToFetchCourses: "Failed to fetch courses",
            failedToFetchEvaluations: "Failed to fetch evaluating courses",
          },
          courseDetails: {
            title: "Course Details: {{courseName}}",
            courseCode: "Course Code",
            teacher: "Teacher",
            dates: "Dates",
          },
          loadingD: "Loading course details...",
          errorD: {
            generic: "An error occurred",
            failedToFetchCourses: "Failed to fetch courses",
            failedToFetchResults: "Failed to fetch survey results",
            courseNotAssigned: "This course does not exist or is not assigned to you.",
          },
        },
      },
      fr: {
        translation: {
          header: {
            logout: "Déconnexion",
            language: "Langue",
          },
          modules: {
            title: "Modules",
            searchPlaceholder: "Rechercher des modules...",
            evaluated: "Actuellement évalués ou en cours d'évaluation",
            notEvaluated: "Non évalués",
            code: "Code",
            startDate: "Date de début",
            endDate: "Date de fin",
            viewResults: "Voir les résultats",
            createEvaluation: "Créer une évaluation",
            noEvaluated: "Aucun module n'est actuellement évalué.",
            noToEvaluate: "Aucun module à évaluer.",
          },
          loading: "Chargement...",
          error: "Erreur",
          resultsPage: {
            title: "Résultats pour le cours : {{courseId}}",
            detailsSubtitle: "Détails de toutes les réponses",
          },
          table: {
            question: "Question",
            response: "Réponse",
          },
          noResults: "Aucun résultat disponible.",
          noResponses: "Aucune réponse pour l'instant.",
          errorR: {
            generic: "Une erreur est survenue",
            failedToFetchCourses: "Impossible de récupérer les cours",
            failedToFetchResults: "Impossible de récupérer les résultats des sondages",
            courseNotFound: "Cours introuvable",
            courseNotAssigned: "Ce cours n'existe pas ou ne vous est pas attribué.",
          },
          questions: {
            amountOfWork: "Évaluez la quantité de travail que vous avez effectué pour ce cours",
            levelOfInvolvement: "Évaluez votre niveau d'implication dans les activités de ce cours",
            practicalKnowledge: "Quelle quantité de connaissances pratiques avez-vous acquise dans ce cours ?",
          },
          studentHome: {
            greeting: "Bonjour {{fullName}}, voici vos évaluations",
            ongoingEvaluations: "Évaluations en cours",
            pastEvaluations: "Évaluations passées",
            courseCode: "Code",
            startEvaluation: "Commencer l'évaluation",
            noOngoingEvaluations: "Aucune évaluation en cours disponible.",
            noPastEvaluations: "Aucune évaluation passée trouvée.",
          },
          errorS: {
            generic: "Une erreur est survenue",
            failedToFetchCourses: "Impossible de récupérer les évaluations",
          },
          teacherHome: {
            greeting: "Bonjour {{fullName}}, voici vos cours",
            allCourses: "Tous les cours",
            evaluatingCourses: "Cours en cours d'évaluation ou déjà évalués",
            courseCode: "Code",
            startDate: "Date de début",
            endDate: "Date de fin",
            viewDetails: "Voir les détails et statistiques d'évaluation",
            noCourses: "Aucun cours trouvé.",
            noEvaluatingCourses: "Aucun cours actuellement en évaluation.",
          },
          loadingT: "Chargement des cours...",
          errorT: {
            generic: "Une erreur est survenue",
            failedToFetchCourses: "Impossible de récupérer les cours",
            failedToFetchEvaluations: "Impossible de récupérer les cours en évaluation",
          },
          courseDetails: {
            title: "Détails du cours : {{courseName}}",
            courseCode: "Code du cours",
            teacher: "Professeur",
            dates: "Dates",
          },
          loadingD: "Chargement des détails du cours...",
          errorD: {
            generic: "Une erreur s'est produite",
            failedToFetchCourses: "Échec de la récupération des cours",
            failedToFetchResults: "Échec de la récupération des résultats",
            courseNotAssigned: "Ce cours n'existe pas ou ne vous est pas attribué.",
          },
        },
      },
    },
    fallbackLng: "en", // Langue par défaut
    interpolation: {
      escapeValue: false, // React protège déjà contre les injections XSS
    },
  });

export default i18n;
