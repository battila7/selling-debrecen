import contactInformation from "../content/general/contact-information.json";
import type { AvailableLanguageCode } from "../i18n";

const Contact = {
  general: {
    office: contactInformation["hu"].office,
    email: contactInformation["hu"].email,
    phone: contactInformation["hu"].phone,
    scheduleAppointmentLink: contactInformation["hu"].scheduleAppointmentLink,
    profileImage: contactInformation["hu"].profileImage,
    facebook: contactInformation["hu"].facebook,
    instagram: contactInformation["hu"].instagram,
    tiktok: contactInformation["hu"].tiktok,
  },
  langDependent(lang: AvailableLanguageCode) {
    const key = lang as keyof typeof contactInformation;

    return {
      name: contactInformation[key].name,
      role: contactInformation[key].role,
      description: contactInformation[key].description,
      officeHoursItems: contactInformation[key].officeHoursItems.map(
        (item) => item.element,
      ),
    };
  },
};

export default Contact;
