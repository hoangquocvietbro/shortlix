"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const SOURCE_LANGUAGES = [
  { value: "Automatic detection", label: "Automatic detection" },
  { value: "Arabic (ar)", label: "Arabic" },
  { value: "Chinese - Simplified (zh-CN)", label: "Chinese (Simplified)" },
  { value: "Czech (cs)", label: "Czech" },
  { value: "Danish (da)", label: "Danish" },
  { value: "Dutch (nl)", label: "Dutch" },
  { value: "English (en)", label: "English" },
  { value: "Finnish (fi)", label: "Finnish" },
  { value: "French (fr)", label: "French" },
  { value: "German (de)", label: "German" },
  { value: "Greek (el)", label: "Greek" },
  { value: "Hebrew (he)", label: "Hebrew" },
  { value: "Hungarian (hu)", label: "Hungarian" },
  { value: "Italian (it)", label: "Italian" },
  { value: "Japanese (ja)", label: "Japanese" },
  { value: "Korean (ko)", label: "Korean" },
  { value: "Persian (fa)", label: "Persian" },
  { value: "Polish (pl)", label: "Polish" },
  { value: "Portuguese (pt)", label: "Portuguese" },
  { value: "Russian (ru)", label: "Russian" },
  { value: "Spanish (es)", label: "Spanish" },
  { value: "Turkish (tr)", label: "Turkish" },
  { value: "Ukrainian (uk)", label: "Ukrainian" },
  { value: "Urdu (ur)", label: "Urdu" },
  { value: "Vietnamese (vi)", label: "Vietnamese" },
  { value: "Hindi (hi)", label: "Hindi" },
  { value: "Indonesian (id)", label: "Indonesian" },
  { value: "Bengali (bn)", label: "Bengali" },
  { value: "Telugu (te)", label: "Telugu" },
  { value: "Marathi (mr)", label: "Marathi" },
  { value: "Tamil (ta)", label: "Tamil" },
  { value: "Javanese (jw|jv)", label: "Javanese" },
  { value: "Catalan (ca)", label: "Catalan" },
  { value: "Nepali (ne)", label: "Nepali" },
  { value: "Thai (th)", label: "Thai" },
  { value: "Swedish (sv)", label: "Swedish" },
  { value: "Amharic (am)", label: "Amharic" },
  { value: "Welsh (cy)", label: "Welsh" },
  { value: "Estonian (et)", label: "Estonian" },
  { value: "Croatian (hr)", label: "Croatian" },
  { value: "Icelandic (is)", label: "Icelandic" },
  { value: "Georgian (ka)", label: "Georgian" },
  { value: "Khmer (km)", label: "Khmer" },
  { value: "Slovak (sk)", label: "Slovak" },
  { value: "Albanian (sq)", label: "Albanian" },
  { value: "Serbian (sr)", label: "Serbian" },
  { value: "Azerbaijani (az)", label: "Azerbaijani" },
  { value: "Bulgarian (bg)", label: "Bulgarian" },
  { value: "Galician (gl)", label: "Galician" },
  { value: "Gujarati (gu)", label: "Gujarati" },
  { value: "Kazakh (kk)", label: "Kazakh" },
  { value: "Kannada (kn)", label: "Kannada" },
  { value: "Lithuanian (lt)", label: "Lithuanian" },
  { value: "Latvian (lv)", label: "Latvian" },
  { value: "Macedonian (mk)", label: "Macedonian" },
  { value: "Malayalam (ml)", label: "Malayalam" },
  { value: "Malay (ms)", label: "Malay" },
  { value: "Romanian (ro)", label: "Romanian" },
  { value: "Sinhala (si)", label: "Sinhala" },
  { value: "Sundanese (su)", label: "Sundanese" },
  { value: "Swahili (sw)", label: "Swahili" },
  { value: "Afrikaans (af)", label: "Afrikaans" },
  { value: "Bosnian (bs)", label: "Bosnian" },
  { value: "Latin (la)", label: "Latin" },
  { value: "Myanmar Burmese (my)", label: "Myanmar Burmese" },
  { value: "Norwegian (no|nb)", label: "Norwegian" },
  { value: "Chinese - Traditional (zh-TW)", label: "Chinese (Traditional)" },
  { value: "Assamese (as)", label: "Assamese" },
  { value: "Basque (eu)", label: "Basque" },
  { value: "Hausa (ha)", label: "Hausa" },
  { value: "Haitian Creole (ht)", label: "Haitian Creole" },
  { value: "Armenian (hy)", label: "Armenian" },
  { value: "Lao (lo)", label: "Lao" },
  { value: "Malagasy (mg)", label: "Malagasy" },
  { value: "Mongolian (mn)", label: "Mongolian" },
  { value: "Maltese (mt)", label: "Maltese" },
  { value: "Punjabi (pa)", label: "Punjabi" },
  { value: "Pashto (ps)", label: "Pashto" },
  { value: "Slovenian (sl)", label: "Slovenian" },
  { value: "Shona (sn)", label: "Shona" },
  { value: "Somali (so)", label: "Somali" },
  { value: "Tajik (tg)", label: "Tajik" },
  { value: "Turkmen (tk)", label: "Turkmen" },
  { value: "Tatar (tt)", label: "Tatar" },
  { value: "Uzbek (uz)", label: "Uzbek" },
  { value: "Yoruba (yo)", label: "Yoruba" },
  { value: "Tagalog (tl)", label: "Tagalog" },
  { value: "Aymara (ay)", label: "Aymara" },
  { value: "Bambara (bm)", label: "Bambara" },
  { value: "Cebuano (ceb)", label: "Cebuano" },
  { value: "Chichewa (ny)", label: "Chichewa" },
  { value: "Divehi (dv)", label: "Divehi" },
  { value: "Dogri (doi)", label: "Dogri" },
  { value: "Ewe (ee)", label: "Ewe" },
  { value: "Guarani (gn)", label: "Guarani" },
  { value: "Iloko (ilo)", label: "Iloko" },
  { value: "Kinyarwanda (rw)", label: "Kinyarwanda" },
  { value: "Krio (kri)", label: "Krio" },
  { value: "Kurdish (ku)", label: "Kurdish" },
  { value: "Kirghiz (ky)", label: "Kirghiz" },
  { value: "Ganda (lg)", label: "Ganda" },
  { value: "Maithili (mai)", label: "Maithili" },
  { value: "Oriya (or)", label: "Oriya" },
  { value: "Oromo (om)", label: "Oromo" },
  { value: "Quechua (qu)", label: "Quechua" },
  { value: "Samoan (sm)", label: "Samoan" },
  { value: "Tigrinya (ti)", label: "Tigrinya" },
  { value: "Tsonga (ts)", label: "Tsonga" },
  { value: "Akan (ak)", label: "Akan" },
  { value: "Uighur (ug)", label: "Uighur" }
];

const TARGET_LANGUAGES = SOURCE_LANGUAGES.filter(lang => lang.value !== "Automatic detection");

const WHISPER_MODELS = [
  { value: "tiny", label: "Tiny" },
  { value: "base", label: "Base" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "large-v2", label: "Large V2" },
  { value: "large-v3", label: "Large V3" },
];

const TTS_SPEAKERS = [
  '_XTTS_/AUTOMATIC.wav',
  '>alloy HD OpenAI-TTS',
  '>alloy OpenAI-TTS',
  '>echo HD OpenAI-TTS',
  '>echo OpenAI-TTS',
  '>fable HD OpenAI-TTS',
  '>fable OpenAI-TTS',
  '>nova HD OpenAI-TTS',
  '>nova OpenAI-TTS',
  '>onyx HD OpenAI-TTS',
  '>onyx OpenAI-TTS',
  '>shimmer HD OpenAI-TTS',
  '>shimmer OpenAI-TTS',
  'af-ZA-AdriNeural-Female',
  'af-ZA-WillemNeural-Male',
  'ak-facebook-mms VITS',
  'am-ET-AmehaNeural-Male',
  'am-ET-MekdesNeural-Female',
  'am-facebook-mms VITS',
  'ar-AE-FatimaNeural-Female',
  'ar-AE-HamdanNeural-Male',
  'ar-BH-AliNeural-Male',
  'ar-BH-LailaNeural-Female',
  'ar-DZ-AminaNeural-Female',
  'ar-DZ-IsmaelNeural-Male',
  'ar-EG-SalmaNeural-Female',
  'ar-EG-ShakirNeural-Male',
  'ar-IQ-BasselNeural-Male',
  'ar-IQ-RanaNeural-Female',
  'ar-JO-SanaNeural-Female',
  'ar-JO-TaimNeural-Male',
  'ar-KW-FahedNeural-Male',
  'ar-KW-NouraNeural-Female',
  'ar-LB-LaylaNeural-Female',
  'ar-LB-RamiNeural-Male',
  'ar-LY-ImanNeural-Female',
  'ar-LY-OmarNeural-Male',
  'ar-MA-JamalNeural-Male',
  'ar-MA-MounaNeural-Female',
  'ar-OM-AbdullahNeural-Male',
  'ar-OM-AyshaNeural-Female',
  'ar-QA-AmalNeural-Female',
  'ar-QA-MoazNeural-Male',
  'ar-SA-HamedNeural-Male',
  'ar-SA-ZariyahNeural-Female',
  'ar-SY-AmanyNeural-Female',
  'ar-SY-LaithNeural-Male',
  'ar-TN-HediNeural-Male',
  'ar-TN-ReemNeural-Female',
  'ar-YE-MaryamNeural-Female',
  'ar-YE-SalehNeural-Male',
  'ar-facebook-mms VITS',
  'as-facebook-mms VITS',
  'as_Nagamese-facebook-mms VITS',
  'ay-facebook-mms VITS',
  'az-AZ-BabekNeural-Male',
  'az-AZ-BanuNeural-Female',
  'az_North_script_cyrillic-facebook-mms VITS',
  'az_North_script_latin-facebook-mms VITS',
  'az_South-facebook-mms VITS',
  'bg-BG-BorislavNeural-Male',
  'bg-BG-KalinaNeural-Female',
  'bg-facebook-mms VITS',
  'bm-facebook-mms VITS',
  'bn-BD-NabanitaNeural-Female',
  'bn-BD-PradeepNeural-Male',
  'bn-IN-BashkarNeural-Male',
  'bn-IN-TanishaaNeural-Female',
  'bn-facebook-mms VITS',
  'bs-BA-GoranNeural-Male',
  'bs-BA-VesnaNeural-Female',
  'ca-ES-EnricNeural-Male',
  'ca-ES-JoanaNeural-Female',
  'ca-facebook-mms VITS',
  'ceb-facebook-mms VITS',
  'ckb-facebook-mms VITS',
  'cs-CZ-AntoninNeural-Male',
  'cs-CZ-VlastaNeural-Female',
  'cy-GB-AledNeural-Male',
  'cy-GB-NiaNeural-Female',
  'cy-facebook-mms VITS',
  'da-DK-ChristelNeural-Female',
  'da-DK-JeppeNeural-Male',
  'de-AT-IngridNeural-Female',
  'de-AT-JonasNeural-Male',
  'de-CH-JanNeural-Male',
  'de-CH-LeniNeural-Female',
  'de-DE-AmalaNeural-Female',
  'de-DE-ConradNeural-Male',
  'de-DE-FlorianMultilingualNeural-Male',
  'de-DE-KatjaNeural-Female',
  'de-DE-KillianNeural-Male',
  'de-DE-SeraphinaMultilingualNeural-Female',
  'de-facebook-mms VITS',
  'de_speaker_0-Male BARK',
  'de_speaker_1-Male BARK',
  'de_speaker_2-Male BARK',
  'de_speaker_3-Female BARK',
  'de_speaker_4-Male BARK',
  'de_speaker_5-Male BARK',
  'de_speaker_6-Male BARK',
  'de_speaker_7-Male BARK',
  'de_speaker_8-Female BARK',
  'de_speaker_9-Male BARK',
  'doi-facebook-mms VITS',
  'dv-facebook-mms VITS',
  'ee-facebook-mms VITS',
  'el-GR-AthinaNeural-Female',
  'el-GR-NestorasNeural-Male',
  'el-facebook-mms VITS',
  'el_Ancient-facebook-mms VITS',
  'en-AU-NatashaNeural-Female',
  'en-AU-WilliamNeural-Male',
  'en-CA-ClaraNeural-Female',
  'en-CA-LiamNeural-Male',
  'en-GB-LibbyNeural-Female',
  'en-GB-MaisieNeural-Female',
  'en-GB-RyanNeural-Male',
  'en-GB-SoniaNeural-Female',
  'en-GB-ThomasNeural-Male',
  'en-HK-SamNeural-Male',
  'en-HK-YanNeural-Female',
  'en-IE-ConnorNeural-Male',
  'en-IE-EmilyNeural-Female',
  'en-IN-NeerjaExpressiveNeural-Female',
  'en-IN-NeerjaNeural-Female',
  'en-IN-PrabhatNeural-Male',
  'en-KE-AsiliaNeural-Female',
  'en-KE-ChilembaNeural-Male',
  'en-NG-AbeoNeural-Male',
  'en-NG-EzinneNeural-Female',
  'en-NZ-MitchellNeural-Male',
  'en-NZ-MollyNeural-Female',
  'en-PH-JamesNeural-Male',
  'en-PH-RosaNeural-Female',
  'en-SG-LunaNeural-Female',
  'en-SG-WayneNeural-Male',
  'en-TZ-ElimuNeural-Male',
  'en-TZ-ImaniNeural-Female',
  'en-US-AnaNeural-Female',
  'en-US-AndrewMultilingualNeural-Male',
  'en-US-AndrewNeural-Male',
  'en-US-AriaNeural-Female',
  'en-US-AvaMultilingualNeural-Female',
  'en-US-AvaNeural-Female',
  'en-US-BrianMultilingualNeural-Male',
  'en-US-BrianNeural-Male',
  'en-US-ChristopherNeural-Male',
  'en-US-EmmaMultilingualNeural-Female',
  'en-US-EmmaNeural-Female',
  'en-US-EricNeural-Male',
  'en-US-GuyNeural-Male',
  'en-US-JennyNeural-Female',
  'en-US-MichelleNeural-Female',
  'en-US-RogerNeural-Male',
  'en-US-SteffanNeural-Male',
  'en-ZA-LeahNeural-Female',
  'en-ZA-LukeNeural-Male',
  'en-facebook-mms VITS',
  'en_speaker_0-Male BARK',
  'en_speaker_1-Male BARK',
  'en_speaker_2-Male BARK',
  'en_speaker_3-Male BARK',
  'en_speaker_4-Male BARK',
  'en_speaker_5-Male BARK',
  'en_speaker_6-Male BARK',
  'en_speaker_7-Male BARK',
  'en_speaker_8-Male BARK',
  'en_speaker_9-Female BARK',
  'es-AR-ElenaNeural-Female',
  'es-AR-TomasNeural-Male',
  'es-BO-MarceloNeural-Male',
  'es-BO-SofiaNeural-Female',
  'es-CL-CatalinaNeural-Female',
  'es-CL-LorenzoNeural-Male',
  'es-CO-GonzaloNeural-Male',
  'es-CO-SalomeNeural-Female',
  'es-CR-JuanNeural-Male',
  'es-CR-MariaNeural-Female',
  'es-CU-BelkysNeural-Female',
  'es-CU-ManuelNeural-Male',
  'es-DO-EmilioNeural-Male',
  'es-DO-RamonaNeural-Female',
  'es-EC-AndreaNeural-Female',
  'es-EC-LuisNeural-Male',
  'es-ES-AlvaroNeural-Male',
  'es-ES-ElviraNeural-Female',
  'es-ES-XimenaNeural-Female',
  'es-GQ-JavierNeural-Male',
  'es-GQ-TeresaNeural-Female',
  'es-GT-AndresNeural-Male',
  'es-GT-MartaNeural-Female',
  'es-HN-CarlosNeural-Male',
  'es-HN-KarlaNeural-Female',
  'es-MX-DaliaNeural-Female',
  'es-MX-JorgeNeural-Male',
  'es-NI-FedericoNeural-Male',
  'es-NI-YolandaNeural-Female',
  'es-PA-MargaritaNeural-Female',
  'es-PA-RobertoNeural-Male',
  'es-PE-AlexNeural-Male',
  'es-PE-CamilaNeural-Female',
  'es-PR-KarinaNeural-Female',
  'es-PR-VictorNeural-Male',
  'es-PY-MarioNeural-Male',
  'es-PY-TaniaNeural-Female',
  'es-SV-LorenaNeural-Female',
  'es-SV-RodrigoNeural-Male',
  'es-US-AlonsoNeural-Male',
  'es-US-PalomaNeural-Female',
  'es-UY-MateoNeural-Male',
  'es-UY-ValentinaNeural-Female',
  'es-VE-PaolaNeural-Female',
  'es-VE-SebastianNeural-Male',
  'es-facebook-mms VITS',
  'es_speaker_0-Male BARK',
  'es_speaker_1-Male BARK',
  'es_speaker_2-Male BARK',
  'es_speaker_3-Male BARK',
  'es_speaker_4-Male BARK',
  'es_speaker_5-Male BARK',
  'es_speaker_6-Male BARK',
  'es_speaker_7-Male BARK',
  'es_speaker_8-Female BARK',
  'es_speaker_9-Female BARK',
  'et-EE-AnuNeural-Female',
  'et-EE-KertNeural-Male',
  'eu-facebook-mms VITS',
  'fa-IR-DilaraNeural-Female',
  'fa-IR-FaridNeural-Male',
  'fa-facebook-mms VITS',
  'fi-FI-HarriNeural-Male',
  'fi-FI-NooraNeural-Female',
  'fi-facebook-mms VITS',
  'fil-PH-AngeloNeural-Male',
  'fil-PH-BlessicaNeural-Female',
  'fr-BE-CharlineNeural-Female',
  'fr-BE-GerardNeural-Male',
  'fr-CA-AntoineNeural-Male',
  'fr-CA-JeanNeural-Male',
  'fr-CA-SylvieNeural-Female',
  'fr-CA-ThierryNeural-Male',
  'fr-CH-ArianeNeural-Female',
  'fr-CH-FabriceNeural-Male',
  'fr-FR-DeniseNeural-Female',
  'fr-FR-EloiseNeural-Female',
  'fr-FR-HenriNeural-Male',
  'fr-FR-RemyMultilingualNeural-Male',
  'fr-FR-VivienneMultilingualNeural-Female',
  'fr-facebook-mms VITS',
  'fr_speaker_0-Male BARK',
  'fr_speaker_1-Female BARK',
  'fr_speaker_2-Female BARK',
  'fr_speaker_3-Male BARK',
  'fr_speaker_4-Male BARK',
  'fr_speaker_5-Female BARK',
  'fr_speaker_6-Male BARK',
  'fr_speaker_7-Male BARK',
  'fr_speaker_8-Male BARK',
  'fr_speaker_9-Male BARK',
  'ga-IE-ColmNeural-Male',
  'ga-IE-OrlaNeural-Female',
  'gl-ES-RoiNeural-Male',
  'gl-ES-SabelaNeural-Female',
  'gn-facebook-mms VITS',
  'gu-IN-DhwaniNeural-Female',
  'gu-IN-NiranjanNeural-Male',
  'gu-facebook-mms VITS',
  'ha-facebook-mms VITS',
  'he-IL-AvriNeural-Male',
  'he-IL-HilaNeural-Female',
  'he-facebook-mms VITS',
  'hi-IN-MadhurNeural-Male',
  'hi-IN-SwaraNeural-Female',
  'hi-facebook-mms VITS',
  'hi_Fiji-facebook-mms VITS',
  'hi_speaker_0-Female BARK',
  'hi_speaker_1-Female BARK',
  'hi_speaker_2-Male BARK',
  'hi_speaker_3-Female BARK',
  'hi_speaker_4-Female BARK',
  'hi_speaker_5-Male BARK',
  'hi_speaker_6-Male BARK',
  'hi_speaker_7-Male BARK',
  'hi_speaker_8-Male BARK',
  'hi_speaker_9-Female BARK',
  'hr-HR-GabrijelaNeural-Female',
  'hr-HR-SreckoNeural-Male',
  'ht-facebook-mms VITS',
  'hu-HU-NoemiNeural-Female',
  'hu-HU-TamasNeural-Male',
  'hu-facebook-mms VITS',
  'hy_Western-facebook-mms VITS',
  'id-ID-ArdiNeural-Male',
  'id-ID-GadisNeural-Female',
  'id-facebook-mms VITS',
  'ilo-facebook-mms VITS',
  'is-IS-GudrunNeural-Female',
  'is-IS-GunnarNeural-Male',
  'is-facebook-mms VITS',
  'it-IT-DiegoNeural-Male',
  'it-IT-ElsaNeural-Female',
  'it-IT-GiuseppeMultilingualNeural-Male',
  'it-IT-IsabellaNeural-Female',
  'it_speaker_0-Male BARK',
  'it_speaker_1-Male BARK',
  'it_speaker_2-Female BARK',
  'it_speaker_3-Male BARK',
  'it_speaker_4-Male BARK',
  'it_speaker_5-Male BARK',
  'it_speaker_6-Male BARK',
  'it_speaker_7-Female BARK',
  'it_speaker_8-Male BARK',
  'it_speaker_9-Female BARK',
  'iu-Cans-CA-SiqiniqNeural-Female',
  'iu-Cans-CA-TaqqiqNeural-Male',
  'iu-Latn-CA-SiqiniqNeural-Female',
  'iu-Latn-CA-TaqqiqNeural-Male',
  'ja-JP-KeitaNeural-Male',
  'ja-JP-NanamiNeural-Female',
  'ja_speaker_0-Female BARK',
  'ja_speaker_1-Female BARK',
  'ja_speaker_2-Male BARK',
  'ja_speaker_3-Female BARK',
  'ja_speaker_4-Female BARK',
  'ja_speaker_5-Female BARK',
  'ja_speaker_6-Male BARK',
  'ja_speaker_7-Female BARK',
  'ja_speaker_8-Female BARK',
  'ja_speaker_9-Female BARK',
  'jv-ID-DimasNeural-Male',
  'jv-ID-SitiNeural-Female',
  'jw-facebook-mms VITS',
  'jw_Suriname-facebook-mms VITS',
  'ka-GE-EkaNeural-Female',
  'ka-GE-GiorgiNeural-Male',
  'kk-KZ-AigulNeural-Female',
  'kk-KZ-DauletNeural-Male',
  'kk-facebook-mms VITS',
  'km-KH-PisethNeural-Male',
  'km-KH-SreymomNeural-Female',
  'km-facebook-mms VITS',
  'km_Northern-facebook-mms VITS',
  'kn-IN-GaganNeural-Male',
  'kn-IN-SapnaNeural-Female',
  'kn-facebook-mms VITS',
  'ko-KR-HyunsuMultilingualNeural-Male',
  'ko-KR-InJoonNeural-Male',
  'ko-KR-SunHiNeural-Female',
  'ko-facebook-mms VITS',
  'ko_speaker_0-Female BARK',
  'ko_speaker_1-Male BARK',
  'ko_speaker_2-Male BARK',
  'ko_speaker_3-Male BARK',
  'ko_speaker_4-Male BARK',
  'ko_speaker_5-Male BARK',
  'ko_speaker_6-Male BARK',
  'ko_speaker_7-Male BARK',
  'ko_speaker_8-Male BARK',
  'ko_speaker_9-Male BARK',
  'kri-facebook-mms VITS',
  'ku_script_arabic-facebook-mms VITS',
  'ku_script_cyrillic-facebook-mms VITS',
  'ku_script_latin-facebook-mms VITS',
  'ky-facebook-mms VITS',
  'la-facebook-mms VITS',
  'lg-facebook-mms VITS',
  'lo-LA-ChanthavongNeural-Male',
  'lo-LA-KeomanyNeural-Female',
  'lo-facebook-mms VITS',
  'lt-LT-LeonasNeural-Male',
  'lt-LT-OnaNeural-Female',
  'lv-LV-EveritaNeural-Female',
  'lv-LV-NilsNeural-Male',
  'lv-facebook-mms VITS',
  'mai-facebook-mms VITS',
  'mg-facebook-mms VITS',
  'mk-MK-AleksandarNeural-Male',
  'mk-MK-MarijaNeural-Female',
  'ml-IN-MidhunNeural-Male',
  'ml-IN-SobhanaNeural-Female',
  'ml-facebook-mms VITS',
  'mn-MN-BataaNeural-Male',
  'mn-MN-YesuiNeural-Female',
  'mn-facebook-mms VITS',
  'mr-IN-AarohiNeural-Female',
  'mr-IN-ManoharNeural-Male',
  'mr-facebook-mms VITS',
  'ms-MY-OsmanNeural-Male',
  'ms-MY-YasminNeural-Female',
  'ms-facebook-mms VITS',
  'ms_Central-facebook-mms VITS',
  'ms_Manado-facebook-mms VITS',
  'mt-MT-GraceNeural-Female',
  'mt-MT-JosephNeural-Male',
  'my-MM-NilarNeural-Female',
  'my-MM-ThihaNeural-Male',
  'my-facebook-mms VITS',
  'nb-NO-FinnNeural-Male',
  'nb-NO-PernilleNeural-Female',
  'ne-NP-HemkalaNeural-Female',
  'ne-NP-SagarNeural-Male',
  'ne-facebook-mms VITS',
  'nl-BE-ArnaudNeural-Male',
  'nl-BE-DenaNeural-Female',
  'nl-NL-ColetteNeural-Female',
  'nl-NL-FennaNeural-Female',
  'nl-NL-MaartenNeural-Male',
  'nl-facebook-mms VITS',
  'ny-facebook-mms VITS',
  'om-facebook-mms VITS',
  'or-facebook-mms VITS',
  'pa_Eastern-facebook-mms VITS',
  'pl-PL-MarekNeural-Male',
  'pl-PL-ZofiaNeural-Female',
  'pl-facebook-mms VITS',
  'pl_speaker_0-Male BARK',
  'pl_speaker_1-Male BARK',
  'pl_speaker_2-Male BARK',
  'pl_speaker_3-Male BARK',
  'pl_speaker_4-Female BARK',
  'pl_speaker_5-Male BARK',
  'pl_speaker_6-Female BARK',
  'pl_speaker_7-Male BARK',
  'pl_speaker_8-Male BARK',
  'pl_speaker_9-Female BARK',
  'ps-AF-GulNawazNeural-Male',
  'ps-AF-LatifaNeural-Female',
  'pt-BR-AntonioNeural-Male',
  'pt-BR-FranciscaNeural-Female',
  'pt-BR-ThalitaMultilingualNeural-Female',
  'pt-PT-DuarteNeural-Male',
  'pt-PT-RaquelNeural-Female',
  'pt-facebook-mms VITS',
  'pt_speaker_0-Male BARK',
  'pt_speaker_1-Male BARK',
  'pt_speaker_2-Male BARK',
  'pt_speaker_3-Male BARK',
  'pt_speaker_4-Male BARK',
  'pt_speaker_5-Male BARK',
  'pt_speaker_6-Male BARK',
  'pt_speaker_7-Male BARK',
  'pt_speaker_8-Male BARK',
  'pt_speaker_9-Male BARK',
  'qu_Ayacucho-facebook-mms VITS',
  'qu_Cajamarca-facebook-mms VITS',
  'qu_Cañar_Highland-facebook-mms VITS',
  'qu_Cusco-facebook-mms VITS',
  'qu_Eastern_Apurímac-facebook-mms VITS',
  'qu_Huallaga-facebook-mms VITS',
  'qu_Huamalíes_Dos_de_Mayo_Huánuco-facebook-mms VITS',
  'qu_Huaylas_Ancash-facebook-mms VITS',
  'qu_Huaylla_Wanca-facebook-mms VITS',
  'qu_Lambayeque-facebook-mms VITS',
  'qu_Margos_Yarowilca_Lauricocha-facebook-mms VITS',
  'qu_Napo-facebook-mms VITS',
  'qu_North_Bolivian-facebook-mms VITS',
  'qu_North_Junín-facebook-mms VITS',
  'qu_Northern_Conchucos_Ancash-facebook-mms VITS',
  'qu_Northern_Pastaza-facebook-mms VITS',
  'qu_Panao-facebook-mms VITS',
  'qu_Salasaca_Highland-facebook-mms VITS',
  'qu_San_Martín-facebook-mms VITS',
  'qu_South_Bolivian-facebook-mms VITS',
  'qu_Southern_Conchucos-facebook-mms VITS',
  'qu_Tena_Lowland-facebook-mms VITS',
  'ro-RO-AlinaNeural-Female',
  'ro-RO-EmilNeural-Male',
  'ro-facebook-mms VITS',
  'ru-RU-DmitryNeural-Male',
  'ru-RU-SvetlanaNeural-Female',
  'ru-facebook-mms VITS',
  'ru_speaker_0-Male BARK',
  'ru_speaker_1-Male BARK',
  'ru_speaker_2-Male BARK',
  'ru_speaker_3-Male BARK',
  'ru_speaker_4-Male BARK',
  'ru_speaker_5-Female BARK',
  'ru_speaker_6-Female BARK',
  'ru_speaker_7-Male BARK',
  'ru_speaker_8-Male BARK',
  'ru_speaker_9-Female BARK',
  'rw-facebook-mms VITS',
  'si-LK-SameeraNeural-Male',
  'si-LK-ThiliniNeural-Female',
  'sk-SK-LukasNeural-Male',
  'sk-SK-ViktoriaNeural-Female',
  'sl-SI-PetraNeural-Female',
  'sl-SI-RokNeural-Male',
  'sm-facebook-mms VITS',
  'sn-facebook-mms VITS',
  'so-SO-MuuseNeural-Male',
  'so-SO-UbaxNeural-Female',
  'so-facebook-mms VITS',
  'sq-AL-AnilaNeural-Female',
  'sq-AL-IlirNeural-Male',
  'sq_Northern-facebook-mms VITS',
  'sr-RS-NicholasNeural-Male',
  'sr-RS-SophieNeural-Female',
  'su-ID-JajangNeural-Male',
  'su-ID-TutiNeural-Female',
  'sv-SE-MattiasNeural-Male',
  'sv-SE-SofieNeural-Female',
  'sv-facebook-mms VITS',
  'sw-KE-RafikiNeural-Male',
  'sw-KE-ZuriNeural-Female',
  'sw-TZ-DaudiNeural-Male',
  'sw-TZ-RehemaNeural-Female',
  'sw-facebook-mms VITS',
  'ta-IN-PallaviNeural-Female',
  'ta-IN-ValluvarNeural-Male',
  'ta-LK-KumarNeural-Male',
  'ta-LK-SaranyaNeural-Female',
  'ta-MY-KaniNeural-Female',
  'ta-MY-SuryaNeural-Male',
  'ta-SG-AnbuNeural-Male',
  'ta-SG-VenbaNeural-Female',
  'ta-facebook-mms VITS',
  'te-IN-MohanNeural-Male',
  'te-IN-ShrutiNeural-Female',
  'te-facebook-mms VITS',
  'tg-facebook-mms VITS',
  'th-TH-NiwatNeural-Male',
  'th-TH-PremwadeeNeural-Female',
  'th-facebook-mms VITS',
  'th_Northern-facebook-mms VITS',
  'ti-facebook-mms VITS',
  'tk_script_arabic-facebook-mms VITS',
  'tk_script_latin-facebook-mms VITS',
  'tl-facebook-mms VITS',
  'tr-TR-AhmetNeural-Male',
  'tr-TR-EmelNeural-Female',
  'tr-facebook-mms VITS',
  'tr_speaker_0-Male BARK',
  'tr_speaker_1-Male BARK',
  'tr_speaker_2-Male BARK',
  'tr_speaker_3-Male BARK',
  'tr_speaker_4-Female BARK',
  'tr_speaker_5-Female BARK',
  'tr_speaker_6-Male BARK',
  'tr_speaker_7-Male BARK',
  'tr_speaker_8-Male BARK',
  'tr_speaker_9-Male BARK',
  'ts-facebook-mms VITS',
  'tt-facebook-mms VITS',
  'tt_Crimean-facebook-mms VITS',
  'ug_script_arabic-facebook-mms VITS',
  'ug_script_cyrillic-facebook-mms VITS',
  'uk-UA-OstapNeural-Male',
  'uk-UA-PolinaNeural-Female',
  'uk-facebook-mms VITS',
  'ur-IN-GulNeural-Female',
  'ur-IN-SalmanNeural-Male',
  'ur-PK-AsadNeural-Male',
  'ur-PK-UzmaNeural-Female',
  'ur_arabic-facebook-mms VITS',
  'ur_devanagari-facebook-mms VITS',
  'ur_latin-facebook-mms VITS',
  'uz-UZ-MadinaNeural-Female',
  'uz-UZ-SardorNeural-Male',
  'uz_script_cyrillic-facebook-mms VITS',
  'vi-VN-HoaiMyNeural-Female',
  'vi-VN-NamMinhNeural-Male',
  'vi-facebook-mms VITS',
  'yo-facebook-mms VITS',
  'zh-CN-XiaoxiaoNeural-Female',
  'zh-CN-XiaoyiNeural-Female',
  'zh-CN-YunjianNeural-Male',
  'zh-CN-YunxiNeural-Male',
  'zh-CN-YunxiaNeural-Male',
  'zh-CN-YunyangNeural-Male',
  'zh-CN-liaoning-XiaobeiNeural-Female',
  'zh-CN-shaanxi-XiaoniNeural-Female',
  'zh-HK-HiuGaaiNeural-Female',
  'zh-HK-HiuMaanNeural-Female',
  'zh-HK-WanLungNeural-Male',
  'zh-TW-HsiaoChenNeural-Female',
  'zh-TW-HsiaoYuNeural-Female',
  'zh-TW-YunJheNeural-Male',
  'zh_Hakka-facebook-mms VITS',
  'zh_MinNan-facebook-mms VITS',
  'zh_speaker_0-Male BARK',
  'zh_speaker_1-Male BARK',
  'zh_speaker_2-Male BARK',
  'zh_speaker_3-Male BARK',
  'zh_speaker_4-Female BARK',
  'zh_speaker_5-Male BARK',
  'zh_speaker_6-Female BARK',
  'zh_speaker_7-Female BARK',
  'zh_speaker_8-Male BARK',
  'zh_speaker_9-Female BARK',
  'zu-ZA-ThandoNeural-Female',
  'zu-ZA-ThembaNeural-Male'
]

const OUTPUT_TYPES = [
  { value: "video (mp4)", label: "Video (MP4)" },
  { value: "video (mkv)", label: "Video (MKV)" },
  { value: "audio (mp3)", label: "Audio (MP3)" },
  { value: "audio (ogg)", label: "Audio (OGG)" },
  { value: "audio (wav)", label: "Audio (WAV)" },
  { value: "subtitle", label: "Subtitle" },
  { value: "subtitle [by speaker]", label: "Subtitle [by speaker]" },
  { value: "video [subtitled] (mp4)", label: "Video with subtitles (MP4)" },
  { value: "video [subtitled] (mkv)", label: "Video with subtitles (MKV)" },
];

const DIARIZATION_MODELS = [
  { value: "pyannote_3.1", label: "Pyannote 3.1" },
  { value: "pyannote_2.1", label: "Pyannote 2.1" },
  { value: "disable", label: "Disable" },
];

const TRANSLATION_PROCESSES = [
  { value: "google_translator_batch", label: "Google Translator (Batch)" },
  { value: "google_translator", label: "Google Translator" },
  { value: "gpt-3.5-turbo-0125_batch", label: "GPT-3.5 Turbo (Batch)" },
  { value: "gpt-3.5-turbo-0125", label: "GPT-3.5 Turbo" },
  { value: "gpt-4-turbo-preview_batch", label: "GPT-4 Turbo (Batch)" },
  { value: "gpt-4-turbo-preview", label: "GPT-4 Turbo" },
  { value: "disable_translation", label: "Disable Translation" },
];

export function VideoTranslator({ videoUrl, onTranslate, isLoading }) {
  const [settings, setSettings] = useState({
    sourceLanguage: "Automatic detection",
    targetLanguage: "English (en)",
    whisperModel: "large-v3",
    maxSpeakers: 1,
    ttsSpeaker: "_XTTS_/AUTOMATIC.wav",
    ttsSpeakers: Array(12).fill("_XTTS_/AUTOMATIC.wav"),
    outputType: "video (mp4)",
    enableVoiceImitation: false,
    enableDereverb: true,
    enableSubtitles: true,
    subtitleType: "srt",
    enableSoftSubtitles: true,
    enableBurnSubtitles: false,
    enableOverlapReduction: true,
    enableSoundCleanup: true,
    enableLiteralizeNumbers: true,
    segmentDurationLimit: 10,
    diarizationModel: "pyannote_3.1",
    translationProcess: "google_translator_batch",
    audioMixingMethod: "Mixing audio with sidechain compression",
    maxAudioAcceleration: 1.0,
    enableAccelerationRateRegulation: true,
    volumeOriginalAudio: 0.0,
    volumeTranslatedAudio: 1.0,
    enableVoicelessTrack: true,
    maxSamples: 1,
    enableRemovePreviousSamples: true,
    voiceImitationMethod: "freevc",
    textSegmentationScale: "sentence",
    workers: 3,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl) return;
    onTranslate(settings);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Translation Settings</CardTitle>
          <CardDescription className="text-neutral-400">
            Configure video translation settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Source Language</Label>
                <Select
                  value={settings.sourceLanguage}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, sourceLanguage: value }))
                  }
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    {SOURCE_LANGUAGES.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Language</Label>
                <Select
                  value={settings.targetLanguage}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, targetLanguage: value }))
                  }
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    {TARGET_LANGUAGES.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Whisper Model */}
            <div className="space-y-2">
              <Label>Whisper ASR Model</Label>
              <Select
                value={settings.whisperModel}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, whisperModel: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {WHISPER_MODELS.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speakers */}
            <div className="space-y-2">
              <Label>Max Speakers</Label>
              <div className="flex items-center gap-2">
              <Slider
                value={[settings.maxSpeakers]}
                min={1}
                max={12}
                step={1}
                onValueChange={([value]) => 
                  setSettings(prev => ({ ...prev, maxSpeakers: value }))
                }
                  className="flex-1"
              />
                <span className="w-10 text-right font-mono">{settings.maxSpeakers}</span>
              </div>
            </div>

            {/* Dynamic TTS Speaker Selection */}
            <div className="space-y-4">
              <Label>Speaker Voices</Label>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: settings.maxSpeakers }, (_, i) => (
                  <div key={i} className="space-y-2">
                    <Label className="text-sm text-neutral-400">Speaker {i + 1}</Label>
              <Select
                      value={settings.ttsSpeakers[i]}
                      onValueChange={(value) => {
                        const newTtsSpeakers = [...settings.ttsSpeakers];
                        newTtsSpeakers[i] = value;
                        setSettings(prev => ({ ...prev, ttsSpeakers: newTtsSpeakers }));
                      }}
                    >
                      <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {TTS_SPEAKERS.map(speaker => (
                          <SelectItem key={speaker} value={speaker}>
                            {speaker}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Type */}
            <div className="space-y-2">
              <Label>Output Type</Label>
              <Select
                value={settings.outputType}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, outputType: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {OUTPUT_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableVoiceImitation"
                  checked={settings.enableVoiceImitation}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableVoiceImitation: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableVoiceImitation">Enable Voice Imitation</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableDereverb"
                  checked={settings.enableDereverb}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableDereverb: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableDereverb">Enable Dereverb</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableSubtitles"
                  checked={settings.enableSubtitles}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableSubtitles: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableSubtitles">Enable Subtitles</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableSoftSubtitles"
                  checked={settings.enableSoftSubtitles}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableSoftSubtitles: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableSoftSubtitles">Enable Soft Subtitles</Label>
              </div>
            </div>

            {/* Translation Process */}
            <div className="space-y-2">
              <Label>Translation Process</Label>
              <Select
                value={settings.translationProcess}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, translationProcess: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {TRANSLATION_PROCESSES.map(process => (
                    <SelectItem key={process.value} value={process.value}>
                      {process.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Audio Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Volume Original Audio</Label>
                <div className="flex items-center gap-2">
                <Slider
                  value={[settings.volumeOriginalAudio]}
                  min={0}
                  max={2.5}
                  step={0.1}
                  onValueChange={([value]) => 
                    setSettings(prev => ({ ...prev, volumeOriginalAudio: value }))
                  }
                    className="flex-1"
                />
                  <span className="w-10 text-right font-mono">{settings.volumeOriginalAudio}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Volume Translated Audio</Label>
                <div className="flex items-center gap-2">
                <Slider
                  value={[settings.volumeTranslatedAudio]}
                  min={0}
                  max={2.5}
                  step={0.1}
                  onValueChange={([value]) => 
                    setSettings(prev => ({ ...prev, volumeTranslatedAudio: value }))
                  }
                    className="flex-1"
                />
                  <span className="w-10 text-right font-mono">{settings.volumeTranslatedAudio}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-black"
            >
              {isLoading ? "Translating..." : "Translate Video"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
