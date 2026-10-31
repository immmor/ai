// 用户条款内容（理财 / 贷款）——单独维护在 js 文件内，支持全部 8 种语言
const TERMS_CONTENT = {
  finance: {
    zh: {
      title: '理财服务协议',
      accept: '同意并继续',
      scrollHint: '请滚动阅读至底部后，再勾选同意以下条款',
      sections: [
        {h:'一、产品性质与风险', p:'本协议项下为定期理财服务，平台作为信息中介提供服务，不承诺保本保收益。理财收益受市场与产品规则影响，可能存在波动，您应充分知悉并自行承担相应风险。'},
        {h:'二、收益计算', p:'年化收益率以存入时页面实际展示为准。收益按资金实际持有天数计算：预计收益 = 本金 × 年化利率 × 持有天数 ÷ 365。页面“预计收益”仅为参考，非保本承诺。'},
        {h:'三、锁定期与提前赎回', p:'资金存入后进入锁定期，到期前原则上不可赎回。如确需提前赎回，平台将依规则处理，可能按活期或降低后的利率计付收益，并可能收取相应手续费，最终以赎回时页面展示为准。'},
        {h:'四、费用与税务', p:'平台可能就理财服务收取约定的服务费用，相关费用将按规则从收益或本金中扣除。因理财产生的税务事项由您自行依法申报与承担。'},
        {h:'五、信息使用与授权', p:'您授权平台在合法范围内收集、使用必要的账户与交易信息，以完成开户、风控、计息、赎回等服务，并依隐私政策保护您的个人信息。'},
        {h:'六、免责与争议处理', p:'因不可抗力、系统维护、监管政策变化等情形导致服务受影响，平台依法依约不承担责任。如发生争议，双方应友好协商，协商不成的提交平台所在地有管辖权的法院处理。'}
      ],
      checks: [
        '我已完整阅读并理解上述全部条款，特别是关于“不保本保收益”与“提前赎回规则”的约定。',
        '我理解理财收益不承诺，收益可能低于或为零，并愿意自行承担相应风险。',
        '我同意在锁定期内不赎回；确需提前赎回时，接受平台相关规则、利率调整与费用。',
        '我确认所提供身份信息真实有效，并授权平台依约处理我的账户与交易数据。'
      ]
    },
    en: {
      title: 'Wealth Management Service Agreement',
      accept: 'Agree & Continue',
      scrollHint: 'Scroll to the bottom, then check and agree to the clauses below',
      sections: [
        {h:'1. Nature & Risk', p:'This is a fixed-term wealth management service. The platform acts as an information intermediary and does not guarantee principal or returns. Returns may fluctuate with the market and product rules; you should understand and bear the relevant risks.'},
        {h:'2. Return Calculation', p:'The annual rate is as shown at the time of deposit. Returns are calculated by actual days held: est. return = principal × annual rate × days ÷ 365. The "estimated return" shown is for reference only, not a guaranteed payout.'},
        {h:'3. Lock-in & Early Redemption', p:'Funds are locked after deposit and generally cannot be redeemed before maturity. If early redemption is requested, the platform will process it per rules, possibly at a reduced rate and with a fee, as shown at redemption time.'},
        {h:'4. Fees & Tax', p:'The platform may charge service fees per the agreement, deducted from returns or principal. Tax obligations arising from the product are your responsibility to declare and bear.'},
        {h:'5. Data Use & Authorization', p:'You authorize the platform to collect and use necessary account and transaction data within the law to provide onboarding, risk control, interest accrual and redemption, protected under our privacy policy.'},
        {h:'6. Disclaimer & Disputes', p:'The platform is not liable for service impacts due to force majeure, maintenance or regulatory changes. Disputes should be resolved through negotiation, otherwise submitted to the competent court where the platform is located.'}
      ],
      checks: [
        'I have read and understood all clauses, especially "no principal/return guarantee" and "early redemption rules".',
        'I understand returns are not guaranteed and may be lower than or zero, and I accept the risk.',
        'I agree not to redeem during the lock-in period; if early redemption is needed, I accept the relevant rules, rate adjustment and fees.',
        'I confirm my identity information is true and authorize the platform to process my account and transaction data per the agreement.'
      ]
    },
    ja: {
      title: '資産運用サービス契約',
      accept: '同意して続行',
      scrollHint: '最後までスクロールしてから、以下の条項にチェックして同意してください',
      sections: [
        {h:'1. 商品の性質とリスク', p:'本サービスは定期的な資産運用サービスであり、プラットフォームは情報仲介として提供し、元本と収益の保証はいたしません。運用収益は市場や商品ルールの影響を受けて変動する可能性があり、お客様は十分に理解し、自身でリスクを負うものとします。'},
        {h:'2. 収益の計算', p:'年利はお預け入れ時の画面に表示された内容が適用されます。収益は資金の実際の保有日数で計算されます：概算収益 = 元本 × 年利 × 保有日数 ÷ 365。画面の「概算収益」は目安であり、元本保証の約束ではありません。'},
        {h:'3. ロックアップ期間と事前償還', p:'資金のお預け入れ後はロックアップ期間に入り、満期前は原則として償還できません。やむを得ず事前償還が必要な場合、プラットフォームは規定に従って処理し、普通預金相当または引き下げ後の金利で収益を支払う場合や、手数料を徴収する場合があり、最終的には償還時の画面表示が適用されます。'},
        {h:'4. 手数料と税金', p:'プラットフォームは資産運用サービスに関して規定のサービス手数料を徴収する場合があり、当該手数料は規定に従い収益または元本から控除されます。運用に伴う税務はお客様ご自身で適切に申告・負担していただきます。'},
        {h:'5. 情報の利用と授権', p:'お客様は、口座開設、リスク管理、利息計算、償還などのサービス提供に必要な範囲で、プラットフォームが適法に必要な口座・取引情報を収集・利用すること、およびプライバシーポリシーに基づきお客様の個人情報を保護することを許諾します。'},
        {h:'6. 免責と紛争処理', p:'不可抗力、システムメンテナンス、規制変更等によりサービスに影響が生じた場合、プラットフォームは法令・契約に基づき責任を負いません。紛争が発生した場合は双方が誠実に協議し、協議が整わない場合はプラットフォーム所在地の管轄裁判所に提起するものとします。'}
      ],
      checks: [
        '私は上記すべての条項、特に「元本・収益の非保証」および「事前償還の規定」について完全に読み理解しました。',
        '私は運用収益が保証されず、収益がマイナスまたはゼロになる可能性があることを理解し、自らリスクを負うことを受け入れます。',
        '私はロックアップ期間中は償還しないことに同意します。やむを得ず事前償還する場合は、プラットフォームの関連規定、金利調整および手数料を受け入れます。',
        '私は提供した身份情報が真正かつ有効であることを確認し、プラットフォームが契約に基づき私の口座・取引データを処理することを許諾します。'
      ]
    },
    ko: {
      title: '자산 운용 서비스 계약',
      accept: '동의하고 계속',
      scrollHint: '하단까지 스크롤한 후 아래 조항을 체크하여 동의해 주세요',
      sections: [
        {h:'1. 상품의 성격과 위험', p:'본 서비스는 정기 자산 운용 서비스이며, 플랫폼은 정보 중개자로서 제공되며 원금과 수익을 보장하지 않습니다. 운용 수익은 시장 및 상품 규칙의 영향을 받아 변동할 수 있으므로, 회원은 이를 충분히 인지하고 스스로 위험을 부담해야 합니다.'},
        {h:'2. 수익 계산', p:'연 금리는 입금 시 화면에 표시된 내용을 기준으로 합니다. 수익은 자금의 실제 보유 일수로 계산됩니다: 예상 수익 = 원금 × 연 금리 × 보유 일수 ÷ 365. 화면의 "예상 수익"은 참고용이며 원금 보장 약속이 아닙니다.'},
        {h:'3. 잠금 기간과 조기 상환', p:'자금 입금 후 잠금 기간에 들어가며, 만기 전에는 원칙적으로 상환할 수 없습니다. 부득이하게 조기 상환이 필요한 경우 플랫폼은 규정에 따라 처리하며, 요구불 또는 인하된 금리로 수익을 지급하거나 수수료를 부과할 수 있으며, 최종적으로는 상환 시 화면 표시가 적용됩니다.'},
        {h:'4. 수수료와 세금', p:'플랫폼은 자산 운용 서비스에 대해 약정된 서비스 수수료를 부과할 수 있으며, 관련 수수료는 규정에 따라 수익 또는 원금에서 공제됩니다. 운용으로 인한 세무 사항은 회원이 직접 법에 따라 신고하고 부담합니다.'},
        {h:'5. 정보 이용과 권한', p:'회원은 계좌 개설, 리스크 관리, 이자 계산, 상환 등의 서비스 제공에 필요한 범위에서 플랫폼이 적법하게 필요한 계좌·거래 정보를 수집·이용하고, 개인정보 보호 정책에 따라 회원의 개인정보를 보호하는 것을 승인합니다.'},
        {h:'6. 면책과 분쟁 처리', p:'불가항력, 시스템 점검, 규제 정책 변경 등으로 인해 서비스에 영향이 발생한 경우 플랫폼은 법령·계약에 따라 책임을 지지 않습니다. 분쟁이 발생하면 양측이 성실히 협의하며, 협의가 이루어지지 않으면 플랫폼 소재지 관할 법원에 제기합니다.'}
      ],
      checks: [
        '나는 위 모든 조항, 특히 "원금·수익 비보장" 및 "조기 상환 규정"에 대해 완전히 읽고 이해했습니다.',
        '나는 운용 수익이 보장되지 않으며 수익이 마이너스가 되거나 0이 될 수 있음을 이해하고, 스스로 위험을 부담하는 것을 수용합니다.',
        '나는 잠금 기간 중에는 상환하지 않는 것에 동의합니다. 부득이하게 조기 상환할 경우 플랫폼의 관련 규정, 금리 조정 및 수수료를 받아들입니다.',
        '나는 제공한 신원 정보가 진실하고 유효함을 확인하며, 플랫폼이 계약에 따라 나의 계좌·거래 데이터를 처리하는 것을 승인합니다.'
      ]
    },
    es: {
      title: 'Acuerdo de gestión de patrimonio',
      accept: 'Aceptar y continuar',
      scrollHint: 'Desplázate hasta el final y luego marca y acepta las cláusulas siguientes',
      sections: [
        {h:'1. Naturaleza y riesgo', p:'El presente es un servicio de gestión de patrimonio a plazo; la plataforma actúa como intermediario de información y no garantiza la protección del capital ni de los rendimientos. Los rendimientos pueden fluctuar según el mercado y las reglas del producto; usted debe conocerlos plenamente y asumir el riesgo por su cuenta.'},
        {h:'2. Cálculo de rendimientos', p:'La tasa anual es la que se muestra en pantalla al realizar el depósito. El rendimiento se calcula por los días reales que mantenga los fondos: rendimiento estimado = capital × tasa anual × días mantenidos ÷ 365. El "rendimiento estimado" en pantalla es solo referencial y no constituye garantía de capital.'},
        {h:'3. Período de bloqueo y reembolso anticipado', p:'Tras el depósito los fondos entran en un período de bloqueo y, por principio, no pueden reembolsarse antes del vencimiento. Si necesita un reembolso anticipado, la plataforma lo gestionará según las reglas, pudiendo pagar el rendimiento a un tipo de cuenta corriente o reducido y cobrar una comisión; lo mostrado en pantalla en el momento del reembolso prevalecerá.'},
        {h:'4. Comisiones e impuestos', p:'La plataforma puede cobrar las comisiones de servicio pactadas por la gestión de patrimonio; dichas comisiones se deducirán del rendimiento o del capital según las reglas. Los aspectos fiscales derivados de la gestión son responsabilidad suya, a quien corresponde declararlos y soportarlos conforme a la ley.'},
        {h:'5. Uso de la información y autorización', p:'Usted autoriza a la plataforma a recopilar y utilizar, dentro del marco legal, la información necesaria de cuenta y de transacciones para prestar servicios de apertura, control de riesgos, cálculo de intereses y reembolso, y a proteger sus datos personales conforme a la política de privacidad.'},
        {h:'6. Exención de responsabilidad y controversias', p:'La plataforma no será responsable por impactos en el servicio debidos a fuerza mayor, mantenimiento del sistema o cambios regulatorios, conforme a la ley y al contrato. Ante cualquier controversia, ambas partes negociarán de buena fe; si no se llega a un acuerdo, se someterá a los tribunales competentes del lugar donde radica la plataforma.'}
      ],
      checks: [
        'He leído y comprendido íntegramente todas las cláusulas, especialmente lo relativo a "no garantía de capital ni rendimiento" y a las "reglas de reembolso anticipado".',
        'Entiendo que los rendimientos no están garantizados y pueden ser inferiores o nulos, y acepto asumir el riesgo por mi cuenta.',
        'Acepto no reembolsar durante el período de bloqueo; si fuera necesario un reembolso anticipado, acepto las reglas, el ajuste de tipo y las comisiones de la plataforma.',
        'Confirmo que la información de identidad proporcionada es veraz y válida, y autorizo a la plataforma a tratar mis datos de cuenta y de transacciones conforme al contrato.'
      ]
    },
    ru: {
      title: 'Соглашение об управлении капиталом',
      accept: 'Принять и продолжить',
      scrollHint: 'Прокрутите до конца, затем отметьте и примите следующие пункты',
      sections: [
        {h:'1. Характер и риски', p:'Настоящий сервис представляет собой срочное управление капиталом; платформа выступает информационным посредником и не гарантирует сохранность капитала и доходности. Доходность может колебаться в зависимости от рынка и правил продукта; вы должны полностью осознавать это и нести риск самостоятельно.'},
        {h:'2. Расчёт доходности', p:'Годовая ставка применяется в соответствии с тем, что показано на экране в момент внесения средств. Доходность рассчитывается по фактическому количеству дней владения: ожидаемая доходность = основной капитал × годовая ставка × дни владения ÷ 365. Показанная на экране "ожидаемая доходность" носит справочный характер и не является гарантией сохранности капитала.'},
        {h:'3. Период блокировки и выкуп', p:'После внесения средства переходят в период блокировки и, как правило, не могут быть выкуплены до наступления срока. Если досрочный выкуп действительно необходим, платформа обработает его по правилам: доходность может выплачиваться по ставке до востребования или пониженной ставке, а также может взиматься комиссия; окончательным является то, что показано на экране в момент выкупа.'},
        {h:'4. Комиссии и налоги', p:'Платформа может взимать предусмотренные соглашением комиссии за управление капиталом; соответствующие комиссии удерживаются из доходности или основного капитала по правилам. Налоговые вопросы, связанные с управлением капиталом, вы решаете и несёте самостоятельно в соответствии с законом.'},
        {h:'5. Использование информации', p:'Вы разрешаете платформе в рамках закона собирать и использовать необходимую информацию об учётной записи и транзакциях для оказания услуг по открытию, управлению рисками, начислению процентов и выкупу, а также защищать ваши персональные данные в соответствии с политикой конфиденциальности.'},
        {h:'6. Ответственность и споры', p:'Платформа не несёт ответственности за влияние на сервис в случаях непреодолимой силы, технического обслуживания или изменения регуляторной политики, в соответствии с законом и договором. При возникновении спора стороны проводят добросовестные переговоры; если согласие не достигнуто, спор передаётся в компетентный суд по месту нахождения платформы.'}
      ],
      checks: [
        'Я полностью прочитал и понял все пункты, особенно касающиеся "негарантии сохранности капитала и доходности" и "правил досрочного выкупа".',
        'Я понимаю, что доходность не гарантируется и может быть ниже нуля или равна нулю, и принимаю на себя соответствующий риск.',
        'Я согласен не производить выкуп в течение периода блокировки; при необходимости досрочного выкупа я принимаю соответствующие правила платформы, изменение ставки и комиссии.',
        'Я подтверждаю, что предоставленные сведения о личности достоверны и действительны, и разрешаю платформе обрабатывать мои данные учётной записи и транзакций в соответствии с договором.'
      ]
    },
    vi: {
      title: 'Thỏa thuận quản lý tài sản',
      accept: 'Đồng ý và tiếp tục',
      scrollHint: 'Hãy cuộn đến cuối, sau đó tích chọn và đồng ý các điều khoản dưới đây',
      sections: [
        {h:'1. Bản chất và rủi ro', p:'Dịch vụ này là dịch vụ quản lý tài sản có kỳ hạn; nền tảng đóng vai trò trung gian thông tin và không cam kết bảo toàn vốn hay lợi nhuận. Lợi nhuận có thể biến động theo thị trường và quy tắc sản phẩm; bạn cần nắm rõ và tự chịu rủi ro.'},
        {h:'2. Tính toán lợi nhuận', p:'Lãi suất hàng năm áp dụng theo nội dung hiển thị trên màn hình tại thời điểm gửi tiền. Lợi nhuận được tính theo số ngày thực tế nắm giữ: lợi nhuận ước tính = vốn × lãi suất hàng năm × số ngày nắm giữ ÷ 365. "Lợi nhuận ước tính" trên màn hình chỉ mang tính tham khảo, không phải cam kết bảo toàn vốn.'},
        {h:'3. Thời gian khóa và tất toán', p:'Sau khi gửi tiền, số dư bước vào thời gian khóa và nguyên tắc không được tất toán trước khi đáo hạn. Nếu thực sự cần tất toán trước hạn, nền tảng sẽ xử lý theo quy tắc, có thể chi trả lợi nhuận theo lãi suất không kỳ hạn hoặc đã giảm, và có thể thu phí; cuối cùng áp dụng theo hiển thị tại thời điểm tất toán.'},
        {h:'4. Phí và thuế', p:'Nền tảng có thể thu các khoản phí dịch vụ đã thỏa thuận cho việc quản lý tài sản; các khoản phí này sẽ được khấu trừ từ lợi nhuận hoặc vốn theo quy tắc. Các vấn đề thuế phát sinh từ quản lý tài sản do bạn tự kê khai và chịu trách nhiệm theo pháp luật.'},
        {h:'5. Sử dụng thông tin', p:'Bạn cho phép nền tảng thu thập, sử dụng thông tin cần thiết về tài khoản và giao dịch trong phạm vi hợp pháp để cung cấp dịch vụ mở tài khoản, quản lý rủi ro, tính lãi và tất toán, đồng thời bảo vệ thông tin cá nhân của bạn theo chính sách bảo mật.'},
        {h:'6. Miễn trừ và tranh chấp', p:'Nền tảng không chịu trách nhiệm với ảnh hưởng đến dịch vụ do bất khả kháng, bảo trì hệ thống hay thay đổi chính sách quản lý, theo pháp luật và hợp đồng. Khi phát sinh tranh chấp, hai bên thương lượng thiện chí; nếu không đạt được thỏa thuận, sẽ đưa ra tòa án có thẩm quyền tại nơi đặt nền tảng.'}
      ],
      checks: [
        'Tôi đã đọc kỹ và hiểu toàn bộ các điều khoản, đặc biệt là quy định "không bảo toàn vốn/lợi nhuận" và "quy tắc tất toán trước hạn".',
        'Tôi hiểu lợi nhuận không được đảm bảo, có thể thấp hơn hoặc bằng không, và tự chịu rủi ro này.',
        'Tôi đồng ý không tất toán trong thời gian khóa; nếu thực sự cần tất toán trước hạn, tôi chấp nhận các quy tắc, điều chỉnh lãi suất và phí của nền tảng.',
        'Tôi xác nhận thông tin định danh cung cấp là thật và hợp lệ, và ủy quyền cho nền tảng xử lý dữ liệu tài khoản và giao dịch của tôi theo hợp đồng.'
      ]
    },
    ar: {
      title: 'اتفاقية خدمة إدارة الثروة',
      accept: 'موافقة ومتابعة',
      scrollHint: 'قم بالتمرير حتى النهاية، ثم حدد ووافق على البنود التالية',
      sections: [
        {h:'1. طبيعة المنتج', p:'هذه خدمة إدارة ثروة ذات أجل محدد؛ تعمل المنصة كوسيط معلومات ولا تضمن الحفاظ على رأس المال أو العوائد. قد تتذبذب العوائد تأثراً بالسوق وقواعد المنتج؛ فيجب أن تدرك ذلك تماماً وتتحمل المخاطر بنفسك.'},
        {h:'2. حساب العوائد', p:'يُطبق المعدل السنوي كما هو معروض على الشاشة وقت الإيداع. يُحسب العائد بعدد الأيام الفعلية التي تحتفظ فيها بالأموال: العائد المتوقع = رأس المال × المعدل السنوي × أيام الاحتفاظ ÷ 365. و"العائد المتوقع" المعروض على الشاشة للمرجعية فقط ولا يمثل وعداً بالحفاظ على رأس المال.'},
        {h:'3. فترة القفل والاسترداد', p:'بعد الإيداع تدخل الأموال في فترة قفل، ولا يمكن استردادها من حيث المبدأ قبل الاستحقاق. إذا لزم الاسترداد المبكر فعلاً، تعالجه المنصة وفق القواعد، وقد تدفع العائد بسعر الفائدة تحت الطلب أو المخفض، وقد تفرض رسوماً؛ ويكون المعروض على الشاشة وقت الاسترداد هو النافذ.'},
        {h:'4. الرسوم والضرائب', p:'قد تفرض المنصة رسوم الخدمة المتفق عليها مقابل إدارة الثروة، وتُخصم هذه الرسوم من العائد أو رأس المال وفق القواعد. وتقع الأمور الضريبية الناشئة عن الإدارة على عاتقك، وعليك الإقرار بها وتحملها وفق القانون.'},
        {h:'5. استخدام المعلومات', p:'تُرخص للمنصة جمع واستخدام معلومات الحساب والمعاملات الضرورية في النطاق القانوني لتقديم خدمات فتح الحساب وإدارة المخاطر وحساب الفوائد والاسترداد، مع حماية بياناتك الشخصية وفق سياسة الخصوصية.'},
        {h:'6. إخلاء المسؤولية', p:'لا تتحمل المنصة المسؤولية عن تأثر الخدمة بسبب القوة القاهرة أو صيانة النظام أو تغير السياسات التنظيمية، وفق القانون والعقد. عند نشوء نزاع، يتفاوض الطرفان بحسن نية؛ فإن تعذر الاتفاق فتُعرض على المحكمة المختصة في مقر المنصة.'}
      ],
      checks: [
        'لقد قرأت وفهمت جميع البنود بما فيها تحديداً أحكام "عدم ضمان رأس المال أو العوائد" و"قواعد الاسترداد المبكر".',
        'أدرك أن العوائد غير مضمونة وقد تكون أقل من الصفر أو مساوية له، وأقبل تحمل هذا الخطر بنفسي.',
        'أوافق على عدم الاسترداد خلال فترة القفل؛ وإن لزم الاسترداد المبكر فأقبل قواعد المنصة وتعديل المعدل والرسوم.',
        'أؤكد صحة وهوية المعلومات المقدمة، وأُرخص للمنصة معالجة بيانات حسابي ومعاملاتي وفق العقد.'
      ]
    }
  },
  loan: {
    zh: {
      title: '借款服务协议',
      accept: '同意并继续',
      scrollHint: '请滚动阅读至底部后，再勾选同意以下条款',
      sections: [
        {h:'一、借款基本信息', p:'借款金额、期限与年化利率以申请页选择为准。利息按实际持有天数计算：利息 = 本金 × 年化利率 × 实际持有天数 ÷ 365，支持提前还款。'},
        {h:'二、还款方式', p:'您可在到期时一次性还本付息，也可提前还款。提前还款利息按实际持有天数计算，不收取额外违约金；还款金额 = 本金 + 按实际天数计收的利息。'},
        {h:'三、逾期与信用', p:'逾期未还将按日计收罚息，并可能影响您的账户信用及后续服务使用。请务必按时足额还款。'},
        {h:'四、资金用途', p:'借款资金仅用于个人合法消费，不得用于投资、赌博或任何违法违规用途。'},
        {h:'五、信息使用与授权', p:'您授权平台在合法范围内查询并使用必要的身份与信用信息，用于风控、催收与争议处理，并依隐私政策保护您的信息。'},
        {h:'六、争议与法律', p:'如发生争议，双方应友好协商；协商不成的，依据平台所在地法律法规处理。'}
      ],
      checks: [
        '我已阅读并理解借款利率、还款方式及提前还款规则。',
        '我承诺按时足额还款，理解逾期将产生罚息并影响信用。',
        '我确认借款资金仅用于合法用途，不用于违法违规活动。',
        '我授权平台在必要时依规使用我的信息进行风控、催收与争议处理。'
      ]
    },
    en: {
      title: 'Loan Service Agreement',
      accept: 'Agree & Continue',
      scrollHint: 'Scroll to the bottom, then check and agree to the clauses below',
      sections: [
        {h:'1. Loan Basics', p:'Loan amount, term and annual rate are as selected on the application page. Interest is calculated by actual days held: interest = principal × annual rate × days ÷ 365, with early repayment supported.'},
        {h:'2. Repayment', p:'You may repay principal and interest in a lump sum at maturity, or repay early. Early repayment interest is calculated by actual days, with no extra penalty; amount = principal + interest by actual days.'},
        {h:'3. Overdue & Credit', p:'Overdue repayment accrues daily penalty interest and may affect your account credit and future services. Please repay on time and in full.'},
        {h:'4. Use of Funds', p:'Loan funds are for personal lawful consumption only, and must not be used for investment, gambling or any unlawful purpose.'},
        {h:'5. Data Use & Authorization', p:'You authorize the platform to query and use necessary identity and credit information within the law for risk control, collection and dispute handling, protected under our privacy policy.'},
        {h:'6. Disputes & Law', p:'Disputes should be resolved through negotiation; otherwise handled under the laws of the jurisdiction where the platform is located.'}
      ],
      checks: [
        'I have read and understood the interest rate, repayment method and early repayment rules.',
        'I promise to repay on time and in full, and understand overdue will incur penalty interest and affect my credit.',
        'I confirm loan funds are used for lawful purposes only, not for unlawful activities.',
        'I authorize the platform to use my information for risk control, collection and dispute handling as needed.'
      ]
    },
    ja: {
      title: '融資サービス契約',
      accept: '同意して続行',
      scrollHint: '最後までスクロールしてから、以下の条項にチェックして同意してください',
      sections: [
        {h:'1. 融資の基本情報', p:'融資金額、期間、年利は申込画面での選択が適用されます。利息は実際の保有日数で計算されます：利息 = 元本 × 年利 × 実際の保有日数 ÷ 365。事前返済に対応しています。'},
        {h:'2. 返済方法', p:'満期時に元本と利息を一括して返済するか、あるいは事前に返済することができます。事前返済の利息は実際の保有日数で計算され、追加の違約金は徴収されません。返済額 = 元本 + 実際の日数で計算された利息。'},
        {h:'3. 延滞と信用', p:'返済を延滞した場合は日単位で遅延損害金が徴収され、お客様の口座の信用および今後のサービス利用に影響を及ぼす可能性があります。必ず期日内に全額返済してください。'},
        {h:'4. 資金の用途', p:'融資資金は個人の合法的な消費のみに使用し、投資、賭博、その他の違法・規則違反の用途に使用してはならないものとします。'},
        {h:'5. 情報の利用と授権', p:'お客様は、リスク管理、取り立て、紛争処理のため、プラットフォームが適法に必要な身份・信用情報を照会・利用すること、およびプライバシーポリシーに基づきお客様の情報を保護することを許諾します。'},
        {h:'6. 紛争と法', p:'紛争が発生した場合は双方が誠実に協議し、協議が整わない場合はプラットフォーム所在地の法令に基づき処理されます。'}
      ],
      checks: [
        '私は融資利率、返済方法、および事前返済の規定を読み理解しました。',
        '私は期日内に全額返済することを約束し、延滞により遅延損害金が発生し信用に影響することを理解します。',
        '私は融資資金が違法な活動ではなく合法的な用途のみに使用されることを確認します。',
        '私は必要に応じてプラットフォームが私の情報をリスク管理、取り立て、紛争処理に適切に利用することを許諾します。'
      ]
    },
    ko: {
      title: '대출 서비스 계약',
      accept: '동의하고 계속',
      scrollHint: '하단까지 스크롤한 후 아래 조항을 체크하여 동의해 주세요',
      sections: [
        {h:'1. 대출 기본 정보', p:'대출 금액, 기간, 연 금리는 신청 페이지에서 선택한 내용을 기준으로 합니다. 이자는 실제 보유 일수로 계산됩니다: 이자 = 원금 × 연 금리 × 실제 보유 일수 ÷ 365. 조기 상환이 가능합니다.'},
        {h:'2. 상환 방법', p:'만기 시 원금과 이자를 일시 상환하거나, 조기 상환할 수 있습니다. 조기 상환 이자는 실제 보유 일수로 계산되며 추가 위약금은 부과되지 않습니다. 상환 금액 = 원금 + 실제 일수로 계산된 이자.'},
        {h:'3. 연체와 신용', p:'상환을 연체하면 일 단위로 연체료가 부과되며, 회원의 계좌 신용 및 향후 서비스 이용에 영향을 미칠 수 있습니다. 반드시 기일 내에 전액 상환해 주세요.'},
        {h:'4. 자금 용도', p:'대출 자금은 개인의 합법적 소비에만 사용하며, 투자·도박 또는 그 밖의 불법·규정 위반 용도로 사용해서는 안 됩니다.'},
        {h:'5. 정보 이용과 권한', p:'회원은 리스크 관리, 추심, 분쟁 처리를 위해 플랫폼이 적법하게 필요한 신원·신용 정보를 조회·이용하고, 개인정보 보호 정책에 따라 회원의 정보를 보호하는 것을 승인합니다.'},
        {h:'6. 분쟁과 법', p:'분쟁이 발생하면 양측이 성실히 협의하며, 협의가 이루어지지 않으면 플랫폼 소재지 법령에 따라 처리됩니다.'}
      ],
      checks: [
        '나는 대출 금리, 상환 방법 및 조기 상환 규정을 읽고 이해했습니다.',
        '나는 기일 내에 전액 상환할 것을 약속하며, 연체 시 연체료가 발생하고 신용에 영향을 미침을 이해합니다.',
        '나는 대출 자금이 불법 활동이 아닌 합법적 용도로만 사용됨을 확인합니다.',
        '나는 필요 시 플랫폼이 내 정보를 리스크 관리, 추심, 분쟁 처리에 적절히 이용하는 것을 승인합니다.'
      ]
    },
    es: {
      title: 'Acuerdo de préstamo',
      accept: 'Aceptar y continuar',
      scrollHint: 'Desplázate hasta el final y luego marca y acepta las cláusulas siguientes',
      sections: [
        {h:'1. Información básica', p:'El importe, plazo y tasa anual del préstamo se basan en lo seleccionado en la página de solicitud. El interés se calcula por los días reales mantenidos: interés = capital × tasa anual × días reales mantenidos ÷ 365. Se admite el reembolso anticipado.'},
        {h:'2. Forma de reembolso', p:'Puede devolver el capital más los intereses de una sola vez al vencimiento, o reembolsar anticipadamente. El interés del reembolso anticipado se calcula por los días reales mantenidos, sin penalización adicional; importe a devolver = capital + interés calculado por los días reales.'},
        {h:'3. Mora y crédito', p:'El reembolso en mora devengará intereses de penalización diarios y podrá afectar al crédito de su cuenta y al uso de servicios futuros. Por favor, reembolse la totalidad en plazo y de forma íntegra.'},
        {h:'4. Uso de los fondos', p:'Los fondos prestados se destinan únicamente a consumo personal legítimo, y no a inversiones, juegos de azar ni a ningún uso ilegal o irregular.'},
        {h:'5. Uso de la información', p:'Usted autoriza a la plataforma a consultar y utilizar, dentro del marco legal, la información necesaria de identidad y de crédito para el control de riesgos, la cobranza y la resolución de controversias, y a proteger su información conforme a la política de privacidad.'},
        {h:'6. Controversias y ley', p:'Ante cualquier controversia, ambas partes negociarán de buena fe; si no se llega a un acuerdo, se resolverá conforme a las leyes del lugar donde radica la plataforma.'}
      ],
      checks: [
        'He leído y comprendido la tasa de interés, la forma de reembolso y las reglas de reembolso anticipado.',
        'Prometo reembolsar en plazo y de forma íntegra, y entiendo que la mora generará intereses de penalización y afectará a mi crédito.',
        'Confirmo que los fondos prestados se usan únicamente con fines legítimos y no para actividades ilegales.',
        'Autorizo a la plataforma a utilizar mi información, cuando sea necesario, para el control de riesgos, la cobranza y la resolución de controversias.'
      ]
    },
    ru: {
      title: 'Кредитное соглашение',
      accept: 'Принять и продолжить',
      scrollHint: 'Прокрутите до конца, затем отметьте и примите следующие пункты',
      sections: [
        {h:'1. Основная информация', p:'Сумма, срок и годовая ставка кредита определяются выбранным на странице заявки. Проценты рассчитываются по фактическому количеству дней владения: проценты = основной капитал × годовая ставка × фактические дни владения ÷ 365. Допускается досрочное погашение.'},
        {h:'2. Порядок погашения', p:'Вы можете погасить основной капитал и проценты единовременно при наступлении срока либо досрочно. Проценты при досрочном погашении рассчитываются по фактическим дням владения без дополнительного штрафа; сумма погашения = основной капитал + проценты, рассчитанные по фактическим дням.'},
        {h:'3. Просрочка и кредит', p:'При просрочке погашения ежедневно начисляются штрафные проценты, что может повлиять на кредитную историю учётной записи и на использование будущих услуг. Пожалуйста, погашайте в срок и в полном объёме.'},
        {h:'4. Назначение средств', p:'Кредитные средства используются исключительно для личного законного потребления и не должны направляться на инвестиции, азартные игры или любые незаконные цели.'},
        {h:'5. Использование информации', p:'Вы разрешаете платформе в рамках закона запрашивать и использовать необходимую информацию о личности и кредитоспособности для управления рисками, взыскания и разрешения споров, а также защищать вашу информацию в соответствии с политикой конфиденциальности.'},
        {h:'6. Споры и право', p:'При возникновении спора стороны проводят добросовестные переговоры; если согласие не достигнуто, спор разрешается в соответствии с законодательством по месту нахождения платформы.'}
      ],
      checks: [
        'Я прочитал и понял процентную ставку, порядок погашения и правила досрочного погашения.',
        'Я обязуюсь погашать в срок и в полном объёме и понимаю, что просрочка повлечёт штрафные проценты и повлияет на мой кредит.',
        'Я подтверждаю, что кредитные средства используются исключительно в законных целях, а не для незаконной деятельности.',
        'Я разрешаю платформе при необходимости надлежащим образом использовать мою информацию для управления рисками, взыскания и разрешения споров.'
      ]
    },
    vi: {
      title: 'Thỏa thuận vay',
      accept: 'Đồng ý và tiếp tục',
      scrollHint: 'Hãy cuộn đến cuối, sau đó tích chọn và đồng ý các điều khoản dưới đây',
      sections: [
        {h:'1. Thông tin cơ bản', p:'Số tiền, kỳ hạn và lãi suất hàng năm của khoản vay căn cứ theo lựa chọn trên trang đăng ký. Tiền lãi tính theo số ngày thực tế nắm giữ: tiền lãi = vốn × lãi suất hàng năm × số ngày thực tế nắm giữ ÷ 365. Hỗ trợ trả trước.'},
        {h:'2. Hình thức hoàn trả', p:'Bạn có thể hoàn trả vốn và lãi một lần khi đáo hạn, hoặc trả trước. Tiền lãi khi trả trước tính theo số ngày thực tế nắm giữ, không thu thêm tiền phạt; số tiền hoàn trả = vốn + tiền lãi tính theo số ngày thực tế.'},
        {h:'3. Quá hạn và tín dụng', p:'Trả chậm sẽ bị tính tiền phạt lãi hàng ngày và có thể ảnh hưởng đến tín dụng tài khoản cũng như việc sử dụng dịch vụ sau này. Vui lòng hoàn trả đầy đủ và đúng hạn.'},
        {h:'4. Mục đích sử dụng vốn', p:'Vốn vay chỉ dùng cho tiêu dùng cá nhân hợp pháp, không được dùng cho đầu tư, đánh bạc hay bất kỳ mục đích trái pháp luật nào.'},
        {h:'5. Sử dụng thông tin', p:'Bạn cho phép nền tảng tra cứu, sử dụng thông tin cần thiết về định danh và tín dụng trong phạm vi hợp pháp để quản lý rủi ro, thu hồi nợ và giải quyết tranh chấp, đồng thời bảo vệ thông tin của bạn theo chính sách bảo mật.'},
        {h:'6. Tranh chấp và pháp luật', p:'Khi phát sinh tranh chấp, hai bên thương lượng thiện chí; nếu không đạt được thỏa thuận, sẽ giải quyết theo pháp luật tại nơi đặt nền tảng.'}
      ],
      checks: [
        'Tôi đã đọc và hiểu lãi suất vay, hình thức hoàn trả và quy tắc trả trước.',
        'Tôi cam kết hoàn trả đầy đủ và đúng hạn, hiểu rằng quá hạn sẽ phát sinh tiền phạt lãi và ảnh hưởng đến tín dụng.',
        'Tôi xác nhận vốn vay chỉ dùng cho mục đích hợp pháp, không dùng cho hoạt động trái pháp luật.',
        'Tôi ủy quyền cho nền tảng sử dụng thông tin của tôi khi cần thiết để quản lý rủi ro, thu hồi nợ và giải quyết tranh chấp.'
      ]
    },
    ar: {
      title: 'اتفاقية الإقراض',
      accept: 'موافقة ومتابعة',
      scrollHint: 'قم بالتمرير حتى النهاية، ثم حدد ووافق على البنود التالية',
      sections: [
        {h:'1. معلومات القرض', p:'مبلغ القرض ومدته ومعدله السنوي وفق ما يُختار في صفحة الطلب. يُحسب الفائدة بعدد أيام الاحتفاظ الفعلية: الفائدة = رأس المال × المعدل السنوي × أيام الاحتفاظ الفعلية ÷ 365. ويسمح بالسداد المبكر.'},
        {h:'2. طريقة السداد', p:'يمكنك سداد رأس المال والفوائد دفعة واحدة عند الاستحقاق، أو السداد مبكراً. تُحسب فائدة السداد المبكر بعدد الأيام الفعلية دون غرامة إضافية؛ مبلغ السداد = رأس المال + الفائدة المحسوبة بعدد الأيام الفعلية.'},
        {h:'3. التأخير والائتمان', p:'يترتب على التأخير في السداد فوائد تأخير يومية، وقد يؤثر ذلك على ائتمان حسابك واستخدامك للخدمات لاحقاً. يرجى السداد كاملاً وفي موعده.'},
        {h:'4. غرض استخدام الأموال', p:'تُستخدم أموال القرض للاستهلاك الشخصي المشروع فقط، ولا يجوز استخدامها للاستثمار أو المقامرة أو أي غرض غير قانوني.'},
        {h:'5. استخدام المعلومات', p:'تُرخص للمنصة الاستعلام واستخدام معلومات الهوية والائتمان الضرورية في النطاق القانوني لإدارة المخاطر والتحصيل وتسوية النزاعات، مع حماية معلوماتك وفق سياسة الخصوصية.'},
        {h:'6. النزاعات والقانون', p:'عند نشوء نزاع، يتفاوض الطرفان بحسن نية؛ فإن تعذر الاتفاق فتُعالج وفق قوانين مقر المنصة.'}
      ],
      checks: [
        'لقد قرأت وفهمت معدل الفائدة وطريقة السداد وقواعد السداد المبكر.',
        'أتعهد بالسداد كاملاً وفي موعده، وأدرك أن التأخير يولد فوائد تأخير ويؤثر على ائتماني.',
        'أؤكد أن أموال القرض تُستخدم للأغراض المشروعة فقط، لا للأنشطة غير القانونية.',
        'أُرخص للمنصة استخدام معلوماتي عند الحاجة لإدارة المخاطر والتحصيل وتسوية النزاعات.'
      ]
    }
  }
};
function getTermsContent(type){
  const c=(TERMS_CONTENT[type]||{});
  return c[currentLang]||c.zh||{title:'',accept:'同意并继续',scrollHint:'请滚动阅读至底部后，再勾选同意以下条款',sections:[],checks:[]};
}
let _termsAccept=null,_termsChecked=[],_termsScrolled=false,_termsSignRequired=false;
function openTerms(type,onAccept){
  const c=getTermsContent(type);
  _termsAccept=onAccept;
  document.getElementById('termsTitle').textContent=c.title;
  document.getElementById('termsBody').innerHTML=c.sections.map(s=>'<div class="terms-sec"><div class="terms-h">'+escapeHtml(s.h)+'</div><div class="terms-p">'+escapeHtml(s.p)+'</div></div>').join('');
  const cb=document.getElementById('termsChecks');
  _termsChecked=new Array(c.checks.length).fill(false);
  cb.innerHTML=c.checks.map((label,i)=>'<label class="terms-check"><input type="checkbox" disabled onchange="onTermsCheck('+i+',this.checked)"><span>'+escapeHtml(label)+'</span></label>').join('');
  const body=document.getElementById('termsBody');
  body.scrollTop=0;_termsScrolled=false;
  const hint=document.getElementById('termsScrollHint');hint.textContent=c.scrollHint;hint.style.display='block';
  const btn=document.getElementById('termsAcceptBtn');btn.textContent=c.accept;
  btn.disabled=true;btn.classList.add('disabled');
  const signWrap=document.getElementById('termsSignWrap');
  if(type==='loan'){
    signWrap.style.display='';
    initSignPad();
    signStrokes=[];hasSignature=false;
    const ph=document.getElementById('signPlaceholder');if(ph)ph.style.display='';
    const sw=document.getElementById('signCanvasWrap');if(sw)sw.classList.remove('sign-fullscreen');
    _termsSignRequired=true;
  }else{
    signWrap.style.display='none';
    _termsSignRequired=false;
  }
  document.getElementById('termsModal').classList.add('show');
  // 内容未超出可视区域（无需滚动）时，直接视为已读，避免卡死
  if(body.scrollHeight<=body.clientHeight+2){
    _termsScrolled=true;
    document.querySelectorAll('#termsChecks input').forEach(inp=>inp.disabled=false);
    updateTermsAccept();
  }
  if(type==='loan'){ resizeSignCanvas(); renderSign(); }
}
function onTermsScroll(){
  const b=document.getElementById('termsBody');
  if(b.scrollTop+b.clientHeight>=b.scrollHeight-6){
    _termsScrolled=true;
    // 提示保持原样，不消失、不改文本
    document.querySelectorAll('#termsChecks input').forEach(inp=>inp.disabled=false);
    updateTermsAccept();
  }
}
function onTermsCheck(i,checked){
  _termsChecked[i]=checked;
  updateTermsAccept();
}
function updateTermsAccept(){
  const allChecked=_termsChecked.length>0&&_termsChecked.every(Boolean);
  const btn=document.getElementById('termsAcceptBtn');
  const ok=_termsScrolled&&allChecked&&(!_termsSignRequired||hasSignature);
  btn.disabled=!ok;btn.classList.toggle('disabled',!ok);
}
function acceptTerms(){
  const cb=_termsAccept;_termsAccept=null;
  document.getElementById('termsModal').classList.remove('show');
  if(_termsSignRequired && hasSignature){
    try{ window.__loanSignature=document.getElementById('signCanvas').toDataURL('image/png'); }catch(e){ window.__loanSignature=''; }
  }else{ window.__loanSignature=''; }
  if(cb)cb();
}
function closeTermsModal(){document.getElementById('termsModal').classList.remove('show')}

// ===== 贷款手写签名 =====
let signStrokes=[],hasSignature=false,_signInit=false,signDrawing=false,signLast=null;
function initSignPad(){
  if(_signInit)return;_signInit=true;
  const canvas=document.getElementById('signCanvas');if(!canvas)return;
  canvas.style.touchAction='none';
  canvas.addEventListener('pointerdown',signPointerDown);
  canvas.addEventListener('pointermove',signPointerMove);
  window.addEventListener('pointerup',signPointerUp);
  window.addEventListener('resize',function(){
    const sw=document.getElementById('termsSignWrap');
    if(sw&&sw.style.display!=='none'){ resizeSignCanvas(); renderSign(); }
  });
}
function signPos(e,canvas){
  const r=canvas.getBoundingClientRect();
  return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};
}
function signPointerDown(e){
  const wrap=document.getElementById('signCanvasWrap');
  // 小屏签名时自动进入全屏，避免误触与遮挡
  if(window.innerWidth<=640 && wrap && !wrap.classList.contains('sign-fullscreen')){
    e.preventDefault();
    toggleSignFullscreen();
    return;
  }
  e.preventDefault();
  const canvas=document.getElementById('signCanvas');
  signDrawing=true;
  const p=signPos(e,canvas);
  signStrokes.push([p]);signLast=p;hasSignature=true;
  const ph=document.getElementById('signPlaceholder');if(ph)ph.style.display='none';
  updateTermsAccept();
}
function signPointerMove(e){
  if(!signDrawing)return;
  e.preventDefault();
  const canvas=document.getElementById('signCanvas');
  const ctx=canvas.getContext('2d');
  const p=signPos(e,canvas);
  const stroke=signStrokes[signStrokes.length-1];
  if(!stroke)return;
  stroke.push(p);
  const w=canvas.clientWidth,h=canvas.clientHeight;
  ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#111';
  ctx.beginPath();ctx.moveTo(signLast.x*w,signLast.y*h);ctx.lineTo(p.x*w,p.y*h);ctx.stroke();
  signLast=p;
}
function signPointerUp(){ signDrawing=false;signLast=null; }
function resizeSignCanvas(){
  const canvas=document.getElementById('signCanvas');if(!canvas)return;
  const stage=document.getElementById('signStage');if(!stage)return;
  const dpr=window.devicePixelRatio||1;
  const w=stage.clientWidth||300,h=stage.clientHeight||180;
  canvas.width=Math.max(1,Math.floor(w*dpr));
  canvas.height=Math.max(1,Math.floor(h*dpr));
  const ctx=canvas.getContext('2d');
  ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);
}
function renderSign(){
  const canvas=document.getElementById('signCanvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.restore();
  if(!signStrokes.length)return;
  const w=canvas.clientWidth,h=canvas.clientHeight;
  ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#111';
  signStrokes.forEach(function(stroke){
    if(stroke.length<1)return;
    ctx.beginPath();ctx.moveTo(stroke[0].x*w,stroke[0].y*h);
    for(let i=1;i<stroke.length;i++)ctx.lineTo(stroke[i].x*w,stroke[i].y*h);
    ctx.stroke();
  });
}
function clearSignature(){
  signStrokes=[];hasSignature=false;
  const ph=document.getElementById('signPlaceholder');if(ph)ph.style.display='';
  resizeSignCanvas();renderSign();
  updateTermsAccept();
}
function toggleSignFullscreen(){
  const wrap=document.getElementById('signCanvasWrap');if(!wrap)return;
  wrap.classList.toggle('sign-fullscreen');
  requestAnimationFrame(function(){ resizeSignCanvas(); renderSign(); });
}
