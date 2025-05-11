api_name: /swap_visibility

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"SUBMIT VIDEO",	# Literal['SUBMIT VIDEO', 'URL', 'Find Video Path']  in 'Choose Video Source' Dropdown component
		api_name="/swap_visibility"
)
print(result)
Return Type(s)
(
# List[filepath] representing output in 'VIDEO' File component,
# str representing output in 'Media link.' Textbox component,
# str representing output in 'Video Path.' Textbox component,
)
api_name: /submit

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		1,	# float (numeric value between 1 and 12) in 'Max speakers' Slider component
		api_name="/submit"
)
print(result)
Return Type(s)
(
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 1' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 2' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 3' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 4' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 4' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 6' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 7' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 8' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 9' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 10' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 11' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 12' Dropdown component,
)
api_name: /visible_component_subs

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		True,	# bool  in 'Edit generated subtitles' Checkbox component
		api_name="/visible_component_subs"
)
print(result)
Return Type(s)
# str representing output in 'Generated subtitles' Textbox component
api_name: /swap_visibility_1

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"WRITE TEXT",	# Literal['WRITE TEXT', 'SUBMIT DOCUMENT', 'Find Document Path']  in 'Choose Document Source' Dropdown component
		api_name="/swap_visibility_1"
)
print(result)
Return Type(s)
(
# str representing output in 'Text' Textbox component,
# filepath representing output in 'Document' File component,
# str representing output in 'Document Path' Textbox component,
)
api_name: /apply_conf

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_172' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf"
)
print(result)
Return Type(s)
# str representing output in 'value_183' Html component
api_name: /apply_conf_1

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_188' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_1"
)
print(result)
Return Type(s)
# str representing output in 'value_199' Html component
api_name: /apply_conf_2

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_204' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_2"
)
print(result)
Return Type(s)
# str representing output in 'value_215' Html component
api_name: /apply_conf_3

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_220' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_3"
)
print(result)
Return Type(s)
# str representing output in 'value_231' Html component
api_name: /apply_conf_4

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_236' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_4"
)
print(result)
Return Type(s)
# str representing output in 'value_247' Html component
api_name: /apply_conf_5

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_252' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_5"
)
print(result)
Return Type(s)
# str representing output in 'value_263' Html component
api_name: /apply_conf_6

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_268' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_6"
)
print(result)
Return Type(s)
# str representing output in 'value_279' Html component
api_name: /apply_conf_7

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_284' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_7"
)
print(result)
Return Type(s)
# str representing output in 'value_295' Html component
api_name: /apply_conf_8

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_300' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_8"
)
print(result)
Return Type(s)
# str representing output in 'value_311' Html component
api_name: /apply_conf_9

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_316' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_9"
)
print(result)
Return Type(s)
# str representing output in 'value_327' Html component
api_name: /apply_conf_10

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_332' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_10"
)
print(result)
Return Type(s)
# str representing output in 'value_343' Html component
api_name: /apply_conf_11

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'parameter_348' Textbox component
		null,	# Literal[]  in 'Model' Dropdown component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"null",	# Literal['None']  in 'Index' Dropdown component
		0,	# float (numeric value between 0 and 1) in 'Index influence' Slider component
		0,	# float (numeric value between 0 and 7) in 'Respiration median filtering' Slider component
		0,	# float (numeric value between 0 and 1) in 'Envelope ratio' Slider component
		0,	# float (numeric value between 0 and 0.5) in 'Consonant breath protection' Slider component
		api_name="/apply_conf_11"
)
print(result)
Return Type(s)
# str representing output in 'value_359' Html component
api_name: /make_test

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'Text' Textbox component
		"af-ZA-AdriNeural-Female",	# Literal['af-ZA-AdriNeural-Female', 'af-ZA-WillemNeural-Male', 'am-ET-AmehaNeural-Male', 'am-ET-MekdesNeural-Female', 'ar-AE-FatimaNeural-Female', 'ar-AE-HamdanNeural-Male', 'ar-BH-AliNeural-Male', 'ar-BH-LailaNeural-Female', 'ar-DZ-AminaNeural-Female', 'ar-DZ-IsmaelNeural-Male', 'ar-EG-SalmaNeural-Female', 'ar-EG-ShakirNeural-Male', 'ar-IQ-BasselNeural-Male', 'ar-IQ-RanaNeural-Female', 'ar-JO-SanaNeural-Female', 'ar-JO-TaimNeural-Male', 'ar-KW-FahedNeural-Male', 'ar-KW-NouraNeural-Female', 'ar-LB-LaylaNeural-Female', 'ar-LB-RamiNeural-Male', 'ar-LY-ImanNeural-Female', 'ar-LY-OmarNeural-Male', 'ar-MA-JamalNeural-Male', 'ar-MA-MounaNeural-Female', 'ar-OM-AbdullahNeural-Male', 'ar-OM-AyshaNeural-Female', 'ar-QA-AmalNeural-Female', 'ar-QA-MoazNeural-Male', 'ar-SA-HamedNeural-Male', 'ar-SA-ZariyahNeural-Female', 'ar-SY-AmanyNeural-Female', 'ar-SY-LaithNeural-Male', 'ar-TN-HediNeural-Male', 'ar-TN-ReemNeural-Female', 'ar-YE-MaryamNeural-Female', 'ar-YE-SalehNeural-Male', 'az-AZ-BabekNeural-Male', 'az-AZ-BanuNeural-Female', 'bg-BG-BorislavNeural-Male', 'bg-BG-KalinaNeural-Female', 'bn-BD-NabanitaNeural-Female', 'bn-BD-PradeepNeural-Male', 'bn-IN-BashkarNeural-Male', 'bn-IN-TanishaaNeural-Female', 'bs-BA-GoranNeural-Male', 'bs-BA-VesnaNeural-Female', 'ca-ES-EnricNeural-Male', 'ca-ES-JoanaNeural-Female', 'cs-CZ-AntoninNeural-Male', 'cs-CZ-VlastaNeural-Female', 'cy-GB-AledNeural-Male', 'cy-GB-NiaNeural-Female', 'da-DK-ChristelNeural-Female', 'da-DK-JeppeNeural-Male', 'de-AT-IngridNeural-Female', 'de-AT-JonasNeural-Male', 'de-CH-JanNeural-Male', 'de-CH-LeniNeural-Female', 'de-DE-AmalaNeural-Female', 'de-DE-ConradNeural-Male', 'de-DE-FlorianMultilingualNeural-Male', 'de-DE-KatjaNeural-Female', 'de-DE-KillianNeural-Male', 'de-DE-SeraphinaMultilingualNeural-Female', 'el-GR-AthinaNeural-Female', 'el-GR-NestorasNeural-Male', 'en-AU-NatashaNeural-Female', 'en-AU-WilliamNeural-Male', 'en-CA-ClaraNeural-Female', 'en-CA-LiamNeural-Male', 'en-GB-LibbyNeural-Female', 'en-GB-MaisieNeural-Female', 'en-GB-RyanNeural-Male', 'en-GB-SoniaNeural-Female', 'en-GB-ThomasNeural-Male', 'en-HK-SamNeural-Male', 'en-HK-YanNeural-Female', 'en-IE-ConnorNeural-Male', 'en-IE-EmilyNeural-Female', 'en-IN-NeerjaExpressiveNeural-Female', 'en-IN-NeerjaNeural-Female', 'en-IN-PrabhatNeural-Male', 'en-KE-AsiliaNeural-Female', 'en-KE-ChilembaNeural-Male', 'en-NG-AbeoNeural-Male', 'en-NG-EzinneNeural-Female', 'en-NZ-MitchellNeural-Male', 'en-NZ-MollyNeural-Female', 'en-PH-JamesNeural-Male', 'en-PH-RosaNeural-Female', 'en-SG-LunaNeural-Female', 'en-SG-WayneNeural-Male', 'en-TZ-ElimuNeural-Male', 'en-TZ-ImaniNeural-Female', 'en-US-AnaNeural-Female', 'en-US-AndrewMultilingualNeural-Male', 'en-US-AndrewNeural-Male', 'en-US-AriaNeural-Female', 'en-US-AvaMultilingualNeural-Female', 'en-US-AvaNeural-Female', 'en-US-BrianMultilingualNeural-Male', 'en-US-BrianNeural-Male', 'en-US-ChristopherNeural-Male', 'en-US-EmmaMultilingualNeural-Female', 'en-US-EmmaNeural-Female', 'en-US-EricNeural-Male', 'en-US-GuyNeural-Male', 'en-US-JennyNeural-Female', 'en-US-MichelleNeural-Female', 'en-US-RogerNeural-Male', 'en-US-SteffanNeural-Male', 'en-ZA-LeahNeural-Female', 'en-ZA-LukeNeural-Male', 'es-AR-ElenaNeural-Female', 'es-AR-TomasNeural-Male', 'es-BO-MarceloNeural-Male', 'es-BO-SofiaNeural-Female', 'es-CL-CatalinaNeural-Female', 'es-CL-LorenzoNeural-Male', 'es-CO-GonzaloNeural-Male', 'es-CO-SalomeNeural-Female', 'es-CR-JuanNeural-Male', 'es-CR-MariaNeural-Female', 'es-CU-BelkysNeural-Female', 'es-CU-ManuelNeural-Male', 'es-DO-EmilioNeural-Male', 'es-DO-RamonaNeural-Female', 'es-EC-AndreaNeural-Female', 'es-EC-LuisNeural-Male', 'es-ES-AlvaroNeural-Male', 'es-ES-ElviraNeural-Female', 'es-ES-XimenaNeural-Female', 'es-GQ-JavierNeural-Male', 'es-GQ-TeresaNeural-Female', 'es-GT-AndresNeural-Male', 'es-GT-MartaNeural-Female', 'es-HN-CarlosNeural-Male', 'es-HN-KarlaNeural-Female', 'es-MX-DaliaNeural-Female', 'es-MX-JorgeNeural-Male', 'es-NI-FedericoNeural-Male', 'es-NI-YolandaNeural-Female', 'es-PA-MargaritaNeural-Female', 'es-PA-RobertoNeural-Male', 'es-PE-AlexNeural-Male', 'es-PE-CamilaNeural-Female', 'es-PR-KarinaNeural-Female', 'es-PR-VictorNeural-Male', 'es-PY-MarioNeural-Male', 'es-PY-TaniaNeural-Female', 'es-SV-LorenaNeural-Female', 'es-SV-RodrigoNeural-Male', 'es-US-AlonsoNeural-Male', 'es-US-PalomaNeural-Female', 'es-UY-MateoNeural-Male', 'es-UY-ValentinaNeural-Female', 'es-VE-PaolaNeural-Female', 'es-VE-SebastianNeural-Male', 'et-EE-AnuNeural-Female', 'et-EE-KertNeural-Male', 'fa-IR-DilaraNeural-Female', 'fa-IR-FaridNeural-Male', 'fi-FI-HarriNeural-Male', 'fi-FI-NooraNeural-Female', 'fil-PH-AngeloNeural-Male', 'fil-PH-BlessicaNeural-Female', 'fr-BE-CharlineNeural-Female', 'fr-BE-GerardNeural-Male', 'fr-CA-AntoineNeural-Male', 'fr-CA-JeanNeural-Male', 'fr-CA-SylvieNeural-Female', 'fr-CA-ThierryNeural-Male', 'fr-CH-ArianeNeural-Female', 'fr-CH-FabriceNeural-Male', 'fr-FR-DeniseNeural-Female', 'fr-FR-EloiseNeural-Female', 'fr-FR-HenriNeural-Male', 'fr-FR-RemyMultilingualNeural-Male', 'fr-FR-VivienneMultilingualNeural-Female', 'ga-IE-ColmNeural-Male', 'ga-IE-OrlaNeural-Female', 'gl-ES-RoiNeural-Male', 'gl-ES-SabelaNeural-Female', 'gu-IN-DhwaniNeural-Female', 'gu-IN-NiranjanNeural-Male', 'he-IL-AvriNeural-Male', 'he-IL-HilaNeural-Female', 'hi-IN-MadhurNeural-Male', 'hi-IN-SwaraNeural-Female', 'hr-HR-GabrijelaNeural-Female', 'hr-HR-SreckoNeural-Male', 'hu-HU-NoemiNeural-Female', 'hu-HU-TamasNeural-Male', 'id-ID-ArdiNeural-Male', 'id-ID-GadisNeural-Female', 'is-IS-GudrunNeural-Female', 'is-IS-GunnarNeural-Male', 'it-IT-DiegoNeural-Male', 'it-IT-ElsaNeural-Female', 'it-IT-GiuseppeMultilingualNeural-Male', 'it-IT-IsabellaNeural-Female', 'iu-Cans-CA-SiqiniqNeural-Female', 'iu-Cans-CA-TaqqiqNeural-Male', 'iu-Latn-CA-SiqiniqNeural-Female', 'iu-Latn-CA-TaqqiqNeural-Male', 'ja-JP-KeitaNeural-Male', 'ja-JP-NanamiNeural-Female', 'jv-ID-DimasNeural-Male', 'jv-ID-SitiNeural-Female', 'ka-GE-EkaNeural-Female', 'ka-GE-GiorgiNeural-Male', 'kk-KZ-AigulNeural-Female', 'kk-KZ-DauletNeural-Male', 'km-KH-PisethNeural-Male', 'km-KH-SreymomNeural-Female', 'kn-IN-GaganNeural-Male', 'kn-IN-SapnaNeural-Female', 'ko-KR-HyunsuMultilingualNeural-Male', 'ko-KR-InJoonNeural-Male', 'ko-KR-SunHiNeural-Female', 'lo-LA-ChanthavongNeural-Male', 'lo-LA-KeomanyNeural-Female', 'lt-LT-LeonasNeural-Male', 'lt-LT-OnaNeural-Female', 'lv-LV-EveritaNeural-Female', 'lv-LV-NilsNeural-Male', 'mk-MK-AleksandarNeural-Male', 'mk-MK-MarijaNeural-Female', 'ml-IN-MidhunNeural-Male', 'ml-IN-SobhanaNeural-Female', 'mn-MN-BataaNeural-Male', 'mn-MN-YesuiNeural-Female', 'mr-IN-AarohiNeural-Female', 'mr-IN-ManoharNeural-Male', 'ms-MY-OsmanNeural-Male', 'ms-MY-YasminNeural-Female', 'mt-MT-GraceNeural-Female', 'mt-MT-JosephNeural-Male', 'my-MM-NilarNeural-Female', 'my-MM-ThihaNeural-Male', 'nb-NO-FinnNeural-Male', 'nb-NO-PernilleNeural-Female', 'ne-NP-HemkalaNeural-Female', 'ne-NP-SagarNeural-Male', 'nl-BE-ArnaudNeural-Male', 'nl-BE-DenaNeural-Female', 'nl-NL-ColetteNeural-Female', 'nl-NL-FennaNeural-Female', 'nl-NL-MaartenNeural-Male', 'pl-PL-MarekNeural-Male', 'pl-PL-ZofiaNeural-Female', 'ps-AF-GulNawazNeural-Male', 'ps-AF-LatifaNeural-Female', 'pt-BR-AntonioNeural-Male', 'pt-BR-FranciscaNeural-Female', 'pt-BR-ThalitaMultilingualNeural-Female', 'pt-PT-DuarteNeural-Male', 'pt-PT-RaquelNeural-Female', 'ro-RO-AlinaNeural-Female', 'ro-RO-EmilNeural-Male', 'ru-RU-DmitryNeural-Male', 'ru-RU-SvetlanaNeural-Female', 'si-LK-SameeraNeural-Male', 'si-LK-ThiliniNeural-Female', 'sk-SK-LukasNeural-Male', 'sk-SK-ViktoriaNeural-Female', 'sl-SI-PetraNeural-Female', 'sl-SI-RokNeural-Male', 'so-SO-MuuseNeural-Male', 'so-SO-UbaxNeural-Female', 'sq-AL-AnilaNeural-Female', 'sq-AL-IlirNeural-Male', 'sr-RS-NicholasNeural-Male', 'sr-RS-SophieNeural-Female', 'su-ID-JajangNeural-Male', 'su-ID-TutiNeural-Female', 'sv-SE-MattiasNeural-Male', 'sv-SE-SofieNeural-Female', 'sw-KE-RafikiNeural-Male', 'sw-KE-ZuriNeural-Female', 'sw-TZ-DaudiNeural-Male', 'sw-TZ-RehemaNeural-Female', 'ta-IN-PallaviNeural-Female', 'ta-IN-ValluvarNeural-Male', 'ta-LK-KumarNeural-Male', 'ta-LK-SaranyaNeural-Female', 'ta-MY-KaniNeural-Female', 'ta-MY-SuryaNeural-Male', 'ta-SG-AnbuNeural-Male', 'ta-SG-VenbaNeural-Female', 'te-IN-MohanNeural-Male', 'te-IN-ShrutiNeural-Female', 'th-TH-NiwatNeural-Male', 'th-TH-PremwadeeNeural-Female', 'tr-TR-AhmetNeural-Male', 'tr-TR-EmelNeural-Female', 'uk-UA-OstapNeural-Male', 'uk-UA-PolinaNeural-Female', 'ur-IN-GulNeural-Female', 'ur-IN-SalmanNeural-Male', 'ur-PK-AsadNeural-Male', 'ur-PK-UzmaNeural-Female', 'uz-UZ-MadinaNeural-Female', 'uz-UZ-SardorNeural-Male', 'vi-VN-HoaiMyNeural-Female', 'vi-VN-NamMinhNeural-Male', 'zh-CN-XiaoxiaoNeural-Female', 'zh-CN-XiaoyiNeural-Female', 'zh-CN-YunjianNeural-Male', 'zh-CN-YunxiNeural-Male', 'zh-CN-YunxiaNeural-Male', 'zh-CN-YunyangNeural-Male', 'zh-CN-liaoning-XiaobeiNeural-Female', 'zh-CN-shaanxi-XiaoniNeural-Female', 'zh-HK-HiuGaaiNeural-Female', 'zh-HK-HiuMaanNeural-Female', 'zh-HK-WanLungNeural-Male', 'zh-TW-HsiaoChenNeural-Female', 'zh-TW-HsiaoYuNeural-Female', 'zh-TW-YunJheNeural-Male', 'zu-ZA-ThandoNeural-Female', 'zu-ZA-ThembaNeural-Male']  in 'TTS' Dropdown component
		null,	# Literal[]  in 'Model' Dropdown component
		"null",	# Literal['None']  in 'Index' Dropdown component
		-24,	# float (numeric value between -24 and 24) in 'Pitch level' Slider component
		"pm",	# Literal['pm', 'harvest', 'crepe', 'rmvpe', 'rmvpe+']  in 'Pitch algorithm' Dropdown component
		api_name="/make_test"
)
print(result)
Return Type(s)
(
# filepath representing output in 'value_378' Audio component,
# filepath representing output in 'value_377' Audio component,
)
api_name: /download_list

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'URLs' Textbox component
		api_name="/download_list"
)
print(result)
Return Type(s)
# str representing output in 'value_157' Html component
api_name: /update_models

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		api_name="/update_models"
)
print(result)
Return Type(s)
(
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal[] representing output in 'Model' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
# Literal['None'] representing output in 'Index' Dropdown component,
)
api_name: /create_wav_file_vc

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'Name for the TTS' Textbox component
		"https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf",	# filepath  in 'Upload a short audio with the voice' File component
		3,	# float  in 'Time audio start' Number component
		3,	# float  in 'Time audio end' Number component
		"Hello!!",	# str  in 'Directory save' Textbox component
		True,	# bool  in 'Dereverb audio' Checkbox component
		api_name="/create_wav_file_vc"
)
print(result)
Return Type(s)
# str representing output in 'value_48' Html component
api_name: /update_tts_list

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		api_name="/update_tts_list"
)
print(result)
Return Type(s)
(
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 1' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 2' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 3' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 4' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 4' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 6' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 7' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 8' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 9' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 10' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 11' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS Speaker 12' Dropdown component,
# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS'] representing output in 'TTS' Dropdown component,
)
api_name: /batch_multilingual_media_conversion

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		["https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf"],	# List[filepath]  in 'VIDEO' File component
		"Hello!!",	# str  in 'Media link.' Textbox component
		"Hello!!",	# str  in 'Video Path.' Textbox component
		"Hello!!",	# str  in 'HF Token' Textbox component
		True,	# bool  in 'Preview' Checkbox component
		"tiny",	# Literal['tiny', 'base', 'small', 'medium', 'large', 'large-v1', 'large-v2', 'large-v3', 'distil-large-v2', 'Systran/faster-distil-whisper-large-v3', 'Huan69/Belle-whisper-large-v3-zh-punct-fasterwhisper', 'tiny.en', 'base.en', 'small.en', 'medium.en', 'distil-small.en', 'distil-medium.en', 'OpenAI_API_Whisper']  in 'Whisper ASR model' Dropdown component
		1,	# float (numeric value between 1 and 32) in 'Batch size' Slider component
		"default",	# Literal['default', 'auto', 'int8', 'int8_float32', 'int16', 'float32']  in 'Compute type' Dropdown component
		"Automatic detection",	# Literal['Automatic detection', 'Afrikaans (af)', 'Akan (ak)', 'Albanian (sq)', 'Amharic (am)', 'Arabic (ar)', 'Armenian (hy)', 'Assamese (as)', 'Aymara (ay)', 'Azerbaijani (az)', 'Bambara (bm)', 'Basque (eu)', 'Bengali (bn)', 'Bosnian (bs)', 'Bulgarian (bg)', 'Catalan (ca)', 'Cebuano (ceb)', 'Chichewa (ny)', 'Chinese - Simplified (zh-CN)', 'Chinese - Traditional (zh-TW)', 'Croatian (hr)', 'Czech (cs)', 'Danish (da)', 'Divehi (dv)', 'Dogri (doi)', 'Dutch (nl)', 'English (en)', 'Estonian (et)', 'Ewe (ee)', 'Finnish (fi)', 'French (fr)', 'Galician (gl)', 'Ganda (lg)', 'Georgian (ka)', 'German (de)', 'Greek (el)', 'Guarani (gn)', 'Gujarati (gu)', 'Haitian Creole (ht)', 'Hausa (ha)', 'Hebrew (he)', 'Hindi (hi)', 'Hungarian (hu)', 'Icelandic (is)', 'Iloko (ilo)', 'Indonesian (id)', 'Italian (it)', 'Japanese (ja)', 'Javanese (jw|jv)', 'Kannada (kn)', 'Kazakh (kk)', 'Khmer (km)', 'Kinyarwanda (rw)', 'Kirghiz (ky)', 'Korean (ko)', 'Krio (kri)', 'Kurdish (ku)', 'Lao (lo)', 'Latin (la)', 'Latvian (lv)', 'Lithuanian (lt)', 'Macedonian (mk)', 'Maithili (mai)', 'Malagasy (mg)', 'Malay (ms)', 'Malayalam (ml)', 'Maltese (mt)', 'Marathi (mr)', 'Mongolian (mn)', 'Myanmar Burmese (my)', 'Nepali (ne)', 'Norwegian (no|nb)', 'Oriya (or)', 'Oromo (om)', 'Pashto (ps)', 'Persian (fa)', 'Polish (pl)', 'Portuguese (pt)', 'Punjabi (pa)', 'Quechua (qu)', 'Romanian (ro)', 'Russian (ru)', 'Samoan (sm)', 'Serbian (sr)', 'Shona (sn)', 'Sinhala (si)', 'Slovak (sk)', 'Slovenian (sl)', 'Somali (so)', 'Spanish (es)', 'Sundanese (su)', 'Swahili (sw)', 'Swedish (sv)', 'Tagalog (tl)', 'Tajik (tg)', 'Tamil (ta)', 'Tatar (tt)', 'Telugu (te)', 'Thai (th)', 'Tigrinya (ti)', 'Tsonga (ts)', 'Turkish (tr)', 'Turkmen (tk)', 'Uighur (ug)', 'Ukrainian (uk)', 'Urdu (ur)', 'Uzbek (uz)', 'Vietnamese (vi)', 'Welsh (cy)', 'Yoruba (yo)']  in 'Source language' Dropdown component
		"Afrikaans (af)",	# Literal['Afrikaans (af)', 'Akan (ak)', 'Albanian (sq)', 'Amharic (am)', 'Arabic (ar)', 'Armenian (hy)', 'Assamese (as)', 'Aymara (ay)', 'Azerbaijani (az)', 'Bambara (bm)', 'Basque (eu)', 'Bengali (bn)', 'Bosnian (bs)', 'Bulgarian (bg)', 'Catalan (ca)', 'Cebuano (ceb)', 'Chichewa (ny)', 'Chinese - Simplified (zh-CN)', 'Chinese - Traditional (zh-TW)', 'Croatian (hr)', 'Czech (cs)', 'Danish (da)', 'Divehi (dv)', 'Dogri (doi)', 'Dutch (nl)', 'English (en)', 'Estonian (et)', 'Ewe (ee)', 'Finnish (fi)', 'French (fr)', 'Galician (gl)', 'Ganda (lg)', 'Georgian (ka)', 'German (de)', 'Greek (el)', 'Guarani (gn)', 'Gujarati (gu)', 'Haitian Creole (ht)', 'Hausa (ha)', 'Hebrew (he)', 'Hindi (hi)', 'Hungarian (hu)', 'Icelandic (is)', 'Iloko (ilo)', 'Indonesian (id)', 'Italian (it)', 'Japanese (ja)', 'Javanese (jw|jv)', 'Kannada (kn)', 'Kazakh (kk)', 'Khmer (km)', 'Kinyarwanda (rw)', 'Kirghiz (ky)', 'Korean (ko)', 'Krio (kri)', 'Kurdish (ku)', 'Lao (lo)', 'Latin (la)', 'Latvian (lv)', 'Lithuanian (lt)', 'Macedonian (mk)', 'Maithili (mai)', 'Malagasy (mg)', 'Malay (ms)', 'Malayalam (ml)', 'Maltese (mt)', 'Marathi (mr)', 'Mongolian (mn)', 'Myanmar Burmese (my)', 'Nepali (ne)', 'Norwegian (no|nb)', 'Oriya (or)', 'Oromo (om)', 'Pashto (ps)', 'Persian (fa)', 'Polish (pl)', 'Portuguese (pt)', 'Punjabi (pa)', 'Quechua (qu)', 'Romanian (ro)', 'Russian (ru)', 'Samoan (sm)', 'Serbian (sr)', 'Shona (sn)', 'Sinhala (si)', 'Slovak (sk)', 'Slovenian (sl)', 'Somali (so)', 'Spanish (es)', 'Sundanese (su)', 'Swahili (sw)', 'Swedish (sv)', 'Tagalog (tl)', 'Tajik (tg)', 'Tamil (ta)', 'Tatar (tt)', 'Telugu (te)', 'Thai (th)', 'Tigrinya (ti)', 'Tsonga (ts)', 'Turkish (tr)', 'Turkmen (tk)', 'Uighur (ug)', 'Ukrainian (uk)', 'Urdu (ur)', 'Uzbek (uz)', 'Vietnamese (vi)', 'Welsh (cy)', 'Yoruba (yo)']  in 'Translate audio to' Dropdown component
		1,	# float (numeric value between 1 and 12) in 'Min speakers' Slider component
		1,	# float (numeric value between 1 and 12) in 'Max speakers' Slider component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 1' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 2' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 3' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 4' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 4' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 6' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 7' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 8' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 9' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 10' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 11' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 12' Dropdown component
		"Hello!!",	# str  in 'File name' Textbox component
		"Mixing audio with sidechain compression",	# Literal['Mixing audio with sidechain compression', 'Adjusting volumes and mixing audio']  in 'Audio Mixing Method' Dropdown component
		1,	# float (numeric value between 1.0 and 2.5) in 'Max Audio acceleration' Slider component
		True,	# bool  in 'Acceleration Rate Regulation' Checkbox component
		0,	# float (numeric value between 0.0 and 2.5) in 'Volume original audio' Slider component
		0,	# float (numeric value between 0.0 and 2.5) in 'Volume translated audio' Slider component
		"disable",	# Literal['disable', 'srt', 'vtt', 'ass', 'txt', 'tsv', 'json', 'aud']  in 'Subtitle type' Dropdown component
		True,	# bool  in 'Edit generated subtitles' Checkbox component
		True,	# bool  in 'parameter_102' Checkbox component
		"Hello!!",	# str  in 'Generated subtitles' Textbox component
		True,	# bool  in 'Overlap Reduction' Checkbox component
		True,	# bool  in 'Sound Cleanup' Checkbox component
		True,	# bool  in 'Literalize Numbers' Checkbox component
		1,	# float (numeric value between 1 and 30) in 'Segment Duration Limit' Slider component
		"pyannote_3.1",	# Literal['pyannote_3.1', 'pyannote_2.1', 'disable']  in 'Diarization model' Dropdown component
		"google_translator_batch",	# Literal['google_translator_batch', 'google_translator', 'gpt-3.5-turbo-0125_batch', 'gpt-3.5-turbo-0125', 'gpt-4-turbo-preview_batch', 'gpt-4-turbo-preview', 'disable_translation']  in 'Translation process' Dropdown component
		"https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf",	# filepath  in 'Upload an SRT subtitle file (will be used instead of the transcription of Whisper)' File component
		"video (mp4)",	# Literal['video (mp4)', 'video (mkv)', 'audio (mp3)', 'audio (ogg)', 'audio (wav)', 'subtitle', 'subtitle [by speaker]', 'video [subtitled] (mp4)', 'video [subtitled] (mkv)', 'audio [original vocal sound]', 'audio [original background sound]', 'audio [original vocal and background sound]', 'audio [original vocal-dereverb sound]', 'audio [original vocal-dereverb and background sound]', 'raw media']  in 'Output type' Dropdown component
		True,	# bool  in 'Voiceless Track' Checkbox component
		True,	# bool  in 'Active Voice Imitation' Checkbox component
		1,	# float (numeric value between 1 and 10) in 'Max samples' Slider component
		True,	# bool  in 'Dereverb' Checkbox component
		True,	# bool  in 'Remove previous samples' Checkbox component
		"freevc",	# Literal['freevc', 'openvoice', 'openvoice_v2']  in 'Method' Dropdown component
		True,	# bool  in 'Dereverb audio' Checkbox component
		"sentence",	# Literal['sentence', 'word', 'character']  in 'Text Segmentation Scale' Dropdown component
		"Hello!!",	# str  in 'Redivide text segments by:' Textbox component
		True,	# bool  in 'Soft Subtitles' Checkbox component
		True,	# bool  in 'Burn Subtitles' Checkbox component
		True,	# bool  in 'Retrieve Progress' Checkbox component
		True,	# bool  in 'ENABLE' Checkbox component
		3,	# float  in 'workers' Number component
		True,	# bool  in 'parameter_87' Checkbox component
		api_name="/batch_multilingual_media_conversion"
)
print(result)
Return Type(s)
# str representing output in 'Generated subtitles' Textbox component
api_name: /play_sound_alert

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		True,	# bool  in 'Task Status Sound' Checkbox component
		api_name="/play_sound_alert"
)
print(result)
Return Type(s)
# filepath representing output in 'value_382' Audio component
api_name: /batch_multilingual_media_conversion_1

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		["https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf"],	# List[filepath]  in 'VIDEO' File component
		"Hello!!",	# str  in 'Media link.' Textbox component
		"Hello!!",	# str  in 'Video Path.' Textbox component
		"Hello!!",	# str  in 'HF Token' Textbox component
		True,	# bool  in 'Preview' Checkbox component
		"tiny",	# Literal['tiny', 'base', 'small', 'medium', 'large', 'large-v1', 'large-v2', 'large-v3', 'distil-large-v2', 'Systran/faster-distil-whisper-large-v3', 'Huan69/Belle-whisper-large-v3-zh-punct-fasterwhisper', 'tiny.en', 'base.en', 'small.en', 'medium.en', 'distil-small.en', 'distil-medium.en', 'OpenAI_API_Whisper']  in 'Whisper ASR model' Dropdown component
		1,	# float (numeric value between 1 and 32) in 'Batch size' Slider component
		"default",	# Literal['default', 'auto', 'int8', 'int8_float32', 'int16', 'float32']  in 'Compute type' Dropdown component
		"Automatic detection",	# Literal['Automatic detection', 'Afrikaans (af)', 'Akan (ak)', 'Albanian (sq)', 'Amharic (am)', 'Arabic (ar)', 'Armenian (hy)', 'Assamese (as)', 'Aymara (ay)', 'Azerbaijani (az)', 'Bambara (bm)', 'Basque (eu)', 'Bengali (bn)', 'Bosnian (bs)', 'Bulgarian (bg)', 'Catalan (ca)', 'Cebuano (ceb)', 'Chichewa (ny)', 'Chinese - Simplified (zh-CN)', 'Chinese - Traditional (zh-TW)', 'Croatian (hr)', 'Czech (cs)', 'Danish (da)', 'Divehi (dv)', 'Dogri (doi)', 'Dutch (nl)', 'English (en)', 'Estonian (et)', 'Ewe (ee)', 'Finnish (fi)', 'French (fr)', 'Galician (gl)', 'Ganda (lg)', 'Georgian (ka)', 'German (de)', 'Greek (el)', 'Guarani (gn)', 'Gujarati (gu)', 'Haitian Creole (ht)', 'Hausa (ha)', 'Hebrew (he)', 'Hindi (hi)', 'Hungarian (hu)', 'Icelandic (is)', 'Iloko (ilo)', 'Indonesian (id)', 'Italian (it)', 'Japanese (ja)', 'Javanese (jw|jv)', 'Kannada (kn)', 'Kazakh (kk)', 'Khmer (km)', 'Kinyarwanda (rw)', 'Kirghiz (ky)', 'Korean (ko)', 'Krio (kri)', 'Kurdish (ku)', 'Lao (lo)', 'Latin (la)', 'Latvian (lv)', 'Lithuanian (lt)', 'Macedonian (mk)', 'Maithili (mai)', 'Malagasy (mg)', 'Malay (ms)', 'Malayalam (ml)', 'Maltese (mt)', 'Marathi (mr)', 'Mongolian (mn)', 'Myanmar Burmese (my)', 'Nepali (ne)', 'Norwegian (no|nb)', 'Oriya (or)', 'Oromo (om)', 'Pashto (ps)', 'Persian (fa)', 'Polish (pl)', 'Portuguese (pt)', 'Punjabi (pa)', 'Quechua (qu)', 'Romanian (ro)', 'Russian (ru)', 'Samoan (sm)', 'Serbian (sr)', 'Shona (sn)', 'Sinhala (si)', 'Slovak (sk)', 'Slovenian (sl)', 'Somali (so)', 'Spanish (es)', 'Sundanese (su)', 'Swahili (sw)', 'Swedish (sv)', 'Tagalog (tl)', 'Tajik (tg)', 'Tamil (ta)', 'Tatar (tt)', 'Telugu (te)', 'Thai (th)', 'Tigrinya (ti)', 'Tsonga (ts)', 'Turkish (tr)', 'Turkmen (tk)', 'Uighur (ug)', 'Ukrainian (uk)', 'Urdu (ur)', 'Uzbek (uz)', 'Vietnamese (vi)', 'Welsh (cy)', 'Yoruba (yo)']  in 'Source language' Dropdown component
		"Afrikaans (af)",	# Literal['Afrikaans (af)', 'Akan (ak)', 'Albanian (sq)', 'Amharic (am)', 'Arabic (ar)', 'Armenian (hy)', 'Assamese (as)', 'Aymara (ay)', 'Azerbaijani (az)', 'Bambara (bm)', 'Basque (eu)', 'Bengali (bn)', 'Bosnian (bs)', 'Bulgarian (bg)', 'Catalan (ca)', 'Cebuano (ceb)', 'Chichewa (ny)', 'Chinese - Simplified (zh-CN)', 'Chinese - Traditional (zh-TW)', 'Croatian (hr)', 'Czech (cs)', 'Danish (da)', 'Divehi (dv)', 'Dogri (doi)', 'Dutch (nl)', 'English (en)', 'Estonian (et)', 'Ewe (ee)', 'Finnish (fi)', 'French (fr)', 'Galician (gl)', 'Ganda (lg)', 'Georgian (ka)', 'German (de)', 'Greek (el)', 'Guarani (gn)', 'Gujarati (gu)', 'Haitian Creole (ht)', 'Hausa (ha)', 'Hebrew (he)', 'Hindi (hi)', 'Hungarian (hu)', 'Icelandic (is)', 'Iloko (ilo)', 'Indonesian (id)', 'Italian (it)', 'Japanese (ja)', 'Javanese (jw|jv)', 'Kannada (kn)', 'Kazakh (kk)', 'Khmer (km)', 'Kinyarwanda (rw)', 'Kirghiz (ky)', 'Korean (ko)', 'Krio (kri)', 'Kurdish (ku)', 'Lao (lo)', 'Latin (la)', 'Latvian (lv)', 'Lithuanian (lt)', 'Macedonian (mk)', 'Maithili (mai)', 'Malagasy (mg)', 'Malay (ms)', 'Malayalam (ml)', 'Maltese (mt)', 'Marathi (mr)', 'Mongolian (mn)', 'Myanmar Burmese (my)', 'Nepali (ne)', 'Norwegian (no|nb)', 'Oriya (or)', 'Oromo (om)', 'Pashto (ps)', 'Persian (fa)', 'Polish (pl)', 'Portuguese (pt)', 'Punjabi (pa)', 'Quechua (qu)', 'Romanian (ro)', 'Russian (ru)', 'Samoan (sm)', 'Serbian (sr)', 'Shona (sn)', 'Sinhala (si)', 'Slovak (sk)', 'Slovenian (sl)', 'Somali (so)', 'Spanish (es)', 'Sundanese (su)', 'Swahili (sw)', 'Swedish (sv)', 'Tagalog (tl)', 'Tajik (tg)', 'Tamil (ta)', 'Tatar (tt)', 'Telugu (te)', 'Thai (th)', 'Tigrinya (ti)', 'Tsonga (ts)', 'Turkish (tr)', 'Turkmen (tk)', 'Uighur (ug)', 'Ukrainian (uk)', 'Urdu (ur)', 'Uzbek (uz)', 'Vietnamese (vi)', 'Welsh (cy)', 'Yoruba (yo)']  in 'Translate audio to' Dropdown component
		1,	# float (numeric value between 1 and 12) in 'Min speakers' Slider component
		1,	# float (numeric value between 1 and 12) in 'Max speakers' Slider component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 1' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 2' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 3' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 4' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 4' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 6' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 7' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 8' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 9' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 10' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 11' Dropdown component
		"_XTTS_/AUTOMATIC.wav",	# Literal['_XTTS_/AUTOMATIC.wav', '>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS Speaker 12' Dropdown component
		"Hello!!",	# str  in 'File name' Textbox component
		"Mixing audio with sidechain compression",	# Literal['Mixing audio with sidechain compression', 'Adjusting volumes and mixing audio']  in 'Audio Mixing Method' Dropdown component
		1,	# float (numeric value between 1.0 and 2.5) in 'Max Audio acceleration' Slider component
		True,	# bool  in 'Acceleration Rate Regulation' Checkbox component
		0,	# float (numeric value between 0.0 and 2.5) in 'Volume original audio' Slider component
		0,	# float (numeric value between 0.0 and 2.5) in 'Volume translated audio' Slider component
		"disable",	# Literal['disable', 'srt', 'vtt', 'ass', 'txt', 'tsv', 'json', 'aud']  in 'Subtitle type' Dropdown component
		True,	# bool  in 'parameter_102' Checkbox component
		True,	# bool  in 'Edit generated subtitles' Checkbox component
		"Hello!!",	# str  in 'Generated subtitles' Textbox component
		True,	# bool  in 'Overlap Reduction' Checkbox component
		True,	# bool  in 'Sound Cleanup' Checkbox component
		True,	# bool  in 'Literalize Numbers' Checkbox component
		1,	# float (numeric value between 1 and 30) in 'Segment Duration Limit' Slider component
		"pyannote_3.1",	# Literal['pyannote_3.1', 'pyannote_2.1', 'disable']  in 'Diarization model' Dropdown component
		"google_translator_batch",	# Literal['google_translator_batch', 'google_translator', 'gpt-3.5-turbo-0125_batch', 'gpt-3.5-turbo-0125', 'gpt-4-turbo-preview_batch', 'gpt-4-turbo-preview', 'disable_translation']  in 'Translation process' Dropdown component
		"https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf",	# filepath  in 'Upload an SRT subtitle file (will be used instead of the transcription of Whisper)' File component
		"video (mp4)",	# Literal['video (mp4)', 'video (mkv)', 'audio (mp3)', 'audio (ogg)', 'audio (wav)', 'subtitle', 'subtitle [by speaker]', 'video [subtitled] (mp4)', 'video [subtitled] (mkv)', 'audio [original vocal sound]', 'audio [original background sound]', 'audio [original vocal and background sound]', 'audio [original vocal-dereverb sound]', 'audio [original vocal-dereverb and background sound]', 'raw media']  in 'Output type' Dropdown component
		True,	# bool  in 'Voiceless Track' Checkbox component
		True,	# bool  in 'Active Voice Imitation' Checkbox component
		1,	# float (numeric value between 1 and 10) in 'Max samples' Slider component
		True,	# bool  in 'Dereverb' Checkbox component
		True,	# bool  in 'Remove previous samples' Checkbox component
		"freevc",	# Literal['freevc', 'openvoice', 'openvoice_v2']  in 'Method' Dropdown component
		True,	# bool  in 'Dereverb audio' Checkbox component
		"sentence",	# Literal['sentence', 'word', 'character']  in 'Text Segmentation Scale' Dropdown component
		"Hello!!",	# str  in 'Redivide text segments by:' Textbox component
		True,	# bool  in 'Soft Subtitles' Checkbox component
		True,	# bool  in 'Burn Subtitles' Checkbox component
		True,	# bool  in 'Retrieve Progress' Checkbox component
		True,	# bool  in 'ENABLE' Checkbox component
		3,	# float  in 'workers' Number component
		True,	# bool  in 'parameter_87' Checkbox component
		api_name="/batch_multilingual_media_conversion_1"
)
print(result)
Return Type(s)
# List[filepath] representing output in 'DOWNLOAD TRANSLATED VIDEO' File component
api_name: /play_sound_alert_1

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		True,	# bool  in 'Task Status Sound' Checkbox component
		api_name="/play_sound_alert_1"
)
print(result)
Return Type(s)
# filepath representing output in 'value_382' Audio component
api_name: /multilingual_docs_conversion

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		"Hello!!",	# str  in 'Text' Textbox component
		"https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf",	# filepath  in 'Document' File component
		"Hello!!",	# str  in 'Document Path' Textbox component
		"Afrikaans (af)",	# Literal['Afrikaans (af)', 'Akan (ak)', 'Albanian (sq)', 'Amharic (am)', 'Arabic (ar)', 'Armenian (hy)', 'Assamese (as)', 'Aymara (ay)', 'Azerbaijani (az)', 'Bambara (bm)', 'Basque (eu)', 'Bengali (bn)', 'Bosnian (bs)', 'Bulgarian (bg)', 'Catalan (ca)', 'Cebuano (ceb)', 'Chichewa (ny)', 'Chinese - Simplified (zh-CN)', 'Chinese - Traditional (zh-TW)', 'Croatian (hr)', 'Czech (cs)', 'Danish (da)', 'Divehi (dv)', 'Dogri (doi)', 'Dutch (nl)', 'English (en)', 'Estonian (et)', 'Ewe (ee)', 'Finnish (fi)', 'French (fr)', 'Galician (gl)', 'Ganda (lg)', 'Georgian (ka)', 'German (de)', 'Greek (el)', 'Guarani (gn)', 'Gujarati (gu)', 'Haitian Creole (ht)', 'Hausa (ha)', 'Hebrew (he)', 'Hindi (hi)', 'Hungarian (hu)', 'Icelandic (is)', 'Iloko (ilo)', 'Indonesian (id)', 'Italian (it)', 'Japanese (ja)', 'Javanese (jw|jv)', 'Kannada (kn)', 'Kazakh (kk)', 'Khmer (km)', 'Kinyarwanda (rw)', 'Kirghiz (ky)', 'Korean (ko)', 'Krio (kri)', 'Kurdish (ku)', 'Lao (lo)', 'Latin (la)', 'Latvian (lv)', 'Lithuanian (lt)', 'Macedonian (mk)', 'Maithili (mai)', 'Malagasy (mg)', 'Malay (ms)', 'Malayalam (ml)', 'Maltese (mt)', 'Marathi (mr)', 'Mongolian (mn)', 'Myanmar Burmese (my)', 'Nepali (ne)', 'Norwegian (no|nb)', 'Oriya (or)', 'Oromo (om)', 'Pashto (ps)', 'Persian (fa)', 'Polish (pl)', 'Portuguese (pt)', 'Punjabi (pa)', 'Quechua (qu)', 'Romanian (ro)', 'Russian (ru)', 'Samoan (sm)', 'Serbian (sr)', 'Shona (sn)', 'Sinhala (si)', 'Slovak (sk)', 'Slovenian (sl)', 'Somali (so)', 'Spanish (es)', 'Sundanese (su)', 'Swahili (sw)', 'Swedish (sv)', 'Tagalog (tl)', 'Tajik (tg)', 'Tamil (ta)', 'Tatar (tt)', 'Telugu (te)', 'Thai (th)', 'Tigrinya (ti)', 'Tsonga (ts)', 'Turkish (tr)', 'Turkmen (tk)', 'Uighur (ug)', 'Ukrainian (uk)', 'Urdu (ur)', 'Uzbek (uz)', 'Vietnamese (vi)', 'Welsh (cy)', 'Yoruba (yo)']  in 'Source language' Dropdown component
		"Afrikaans (af)",	# Literal['Afrikaans (af)', 'Akan (ak)', 'Albanian (sq)', 'Amharic (am)', 'Arabic (ar)', 'Armenian (hy)', 'Assamese (as)', 'Aymara (ay)', 'Azerbaijani (az)', 'Bambara (bm)', 'Basque (eu)', 'Bengali (bn)', 'Bosnian (bs)', 'Bulgarian (bg)', 'Catalan (ca)', 'Cebuano (ceb)', 'Chichewa (ny)', 'Chinese - Simplified (zh-CN)', 'Chinese - Traditional (zh-TW)', 'Croatian (hr)', 'Czech (cs)', 'Danish (da)', 'Divehi (dv)', 'Dogri (doi)', 'Dutch (nl)', 'English (en)', 'Estonian (et)', 'Ewe (ee)', 'Finnish (fi)', 'French (fr)', 'Galician (gl)', 'Ganda (lg)', 'Georgian (ka)', 'German (de)', 'Greek (el)', 'Guarani (gn)', 'Gujarati (gu)', 'Haitian Creole (ht)', 'Hausa (ha)', 'Hebrew (he)', 'Hindi (hi)', 'Hungarian (hu)', 'Icelandic (is)', 'Iloko (ilo)', 'Indonesian (id)', 'Italian (it)', 'Japanese (ja)', 'Javanese (jw|jv)', 'Kannada (kn)', 'Kazakh (kk)', 'Khmer (km)', 'Kinyarwanda (rw)', 'Kirghiz (ky)', 'Korean (ko)', 'Krio (kri)', 'Kurdish (ku)', 'Lao (lo)', 'Latin (la)', 'Latvian (lv)', 'Lithuanian (lt)', 'Macedonian (mk)', 'Maithili (mai)', 'Malagasy (mg)', 'Malay (ms)', 'Malayalam (ml)', 'Maltese (mt)', 'Marathi (mr)', 'Mongolian (mn)', 'Myanmar Burmese (my)', 'Nepali (ne)', 'Norwegian (no|nb)', 'Oriya (or)', 'Oromo (om)', 'Pashto (ps)', 'Persian (fa)', 'Polish (pl)', 'Portuguese (pt)', 'Punjabi (pa)', 'Quechua (qu)', 'Romanian (ro)', 'Russian (ru)', 'Samoan (sm)', 'Serbian (sr)', 'Shona (sn)', 'Sinhala (si)', 'Slovak (sk)', 'Slovenian (sl)', 'Somali (so)', 'Spanish (es)', 'Sundanese (su)', 'Swahili (sw)', 'Swedish (sv)', 'Tagalog (tl)', 'Tajik (tg)', 'Tamil (ta)', 'Tatar (tt)', 'Telugu (te)', 'Thai (th)', 'Tigrinya (ti)', 'Tsonga (ts)', 'Turkish (tr)', 'Turkmen (tk)', 'Uighur (ug)', 'Ukrainian (uk)', 'Urdu (ur)', 'Uzbek (uz)', 'Vietnamese (vi)', 'Welsh (cy)', 'Yoruba (yo)']  in 'Translate audio to' Dropdown component
		">alloy HD OpenAI-TTS",	# Literal['>alloy HD OpenAI-TTS', k-mms VITS', 'ky-facebook-mms VITS']  in 'TTS' Dropdown component
		"Hello!!",	# str  in 'Final file name' Textbox component
		"google_translator",	# Literal['google_translator', 'gpt-3.5-turbo-0125', 'gpt-4-turbo-preview', 'disable_translation']  in 'Translation process' Dropdown component
		"videobook (mp4)",	# Literal['videobook (mp4)', 'videobook (mkv)', 'audiobook (wav)', 'audiobook (mp3)', 'audiobook (ogg)', 'book (txt)']  in 'Output type' Dropdown component
		3,	# float  in 'Max number of characters that the TTS will process per segment' Number component
		True,	# bool  in 'ENABLE' Checkbox component
		3,	# float  in 'workers' Number component
		3,	# float  in 'Start page' Number component
		3,	# float  in 'End page' Number component
		3,	# float  in 'Width' Number component
		3,	# float  in 'Height' Number component
		"dynamic",	# Literal['dynamic', 'black', 'white', 'red', 'green', 'blue', 'yellow', 'light_gray', 'light_blue', 'light_green', 'light_yellow', 'light_pink', 'lavender', 'peach', 'light_cyan', 'light_salmon', 'light_green_yellow']  in 'Border color' Dropdown component
		True,	# bool  in 'parameter_140' Checkbox component
		api_name="/multilingual_docs_conversion"
)
print(result)
Return Type(s)
# filepath representing output in 'Result' File component
api_name: /play_sound_alert_2

from gradio_client import Client

client = Client("https://hoangquocviet-sonitr.hf.space/")
result = client.predict(
		True,	# bool  in 'Task Status Sound' Checkbox component
		api_name="/play_sound_alert_2"
)
print(result)
Return Type(s)
# filepath representing output in 'value_382' Audio component