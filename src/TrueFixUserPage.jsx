import React, { useState } from 'react';
import { ShieldCheck, Wrench, Smartphone, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

// [수정 3] 불필요한 재렌더링을 막기 위해 정적 Mock Data를 컴포넌트 외부로 분리
const TCO_MOCK_DATA = {
  iphone14pro: {
    display: [
      {
        id: 'official',
        title: '애플 공식 센터',
        desc: '정품 부품, 캘리브레이션 완벽',
        repairCost: 500000,
        depreciation: 0,
        badge: '품질 보증',
        color: 'bg-gray-100 border-gray-300'
      },
      {
        id: 'extract',
        title: 'TrueFix 정품 추출',
        desc: '중고 정품 패널, iOS 18 캘리브레이션 지원',
        repairCost: 250000,
        depreciation: 100000,
        badge: '가장 합리적',
        color: 'bg-blue-50 border-blue-400'
      },
      {
        id: 'copy',
        title: '일반 카피 부품',
        desc: '비정품 LCD/OLED, True Tone 상실',
        repairCost: 150000,
        depreciation: 400000,
        badge: '중고 매각 시 손해',
        color: 'bg-red-50 border-red-200'
      }
    ],
    // [수정 1] 빈 화면 방지를 위해 배터리 옵션 데이터 추가
    battery: [
      {
        id: 'official_bat',
        title: '애플 공식 센터',
        desc: '정품 배터리, 성능 최대치 100% 정상 표기',
        repairCost: 146000,
        depreciation: 0,
        badge: '품질 보증',
        color: 'bg-gray-100 border-gray-300'
      },
      {
        id: 'extract_bat',
        title: 'TrueFix BMS 이식',
        desc: '정품 셀 교체 + BMS 보드 이식 (경고 없음)',
        repairCost: 80000,
        depreciation: 0,
        badge: '가장 합리적',
        color: 'bg-blue-50 border-blue-400'
      },
      {
        id: 'copy_bat',
        title: '일반 사설 교체',
        desc: '알 수 없는 부품 경고, 성능 최대치 확인 불가',
        repairCost: 50000,
        depreciation: 100000,
        badge: '중고 매각 시 손해',
        color: 'bg-red-50 border-red-200'
      }
    ]
  }
};

const TrueFixUserPage = () => {
  const [model, setModel] = useState('iphone14pro');
  const [damage, setDamage] = useState('display');

  // 데이터 매핑: 선택된 옵션의 데이터가 없을 경우 빈 배열 반환
  const currentOptions = TCO_MOCK_DATA[model]?.[damage] || [];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Wrench size={24} />
            TrueFix
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-gray-600">
            <a href="#tco" className="hover:text-blue-600">TCO 진단</a>
            <a href="#safe" className="hover:text-blue-600">데이터 안심 가이드</a>
            <a href="#store" className="hover:text-blue-600">우수 매장 찾기</a>
          </nav>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
            내 주변 수리점
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <section id="tco" className="mb-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">당장의 수리비보다 <span className="text-blue-600">최종 손실액(TCO)</span>을 확인하세요</h1>
            <p className="text-gray-500 md:text-lg">카피 부품으로 10만 원 아끼려다 중고 매각 시 40만 원 손해볼 수 있습니다.</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">기종 선택</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="iphone14pro">iPhone 14 Pro</option>
                  <option value="iphone15pro">iPhone 15 Pro (준비 중)</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">파손 부위</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={damage}
                  onChange={(e) => setDamage(e.target.value)}
                >
                  <option value="display">전면 디스플레이 (액정)</option>
                  <option value="battery">배터리 열화</option>
                  <option value="backglass">후면 유리 (준비 중)</option>
                </select>
              </div>
            </div>

            {/* [수정 1] Fallback UI: 데이터가 없을 경우 안내 메시지 출력 */}
            {currentOptions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                <AlertCircle size={32} className="mb-2 text-gray-400" />
                <p>해당 기종 및 파손 부위의 시뮬레이션 데이터는 업데이트 중입니다.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {currentOptions.map((opt) => (
                  <div key={opt.id} className={`relative p-6 rounded-xl border-2 ${opt.color} flex flex-col`}>
                    {opt.id.includes('extract') && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        TrueFix 추천
                      </div>
                    )}
                    <h3 className="text-lg font-bold mb-1">{opt.title}</h3>
                    <p className="text-xs text-gray-500 mb-4 h-8">{opt.desc}</p>
                    
                    <div className="mt-auto space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">예상 수리비</span>
                        <span className="font-semibold">{opt.repairCost.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">예상 감가액</span>
                        <span className="font-semibold text-red-500">+{opt.depreciation.toLocaleString()}원</span>
                      </div>
                      <hr className="border-gray-200 my-2" />
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">최종 손실액</span>
                        <span className="font-bold text-gray-900">{(opt.repairCost + opt.depreciation).toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {currentOptions.length > 0 && (
              <div className="mt-6 flex justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 flex items-center gap-2 transition shadow-md">
                  이 조건으로 우수 매장 예약하기 <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="safe" className="mb-16">
          <div className="bg-gray-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={28} className="text-green-400" />
                <h2 className="text-2xl font-bold">TrueFix Data-Safe 보증</h2>
              </div>
              {/* [수정 2] line-height-relaxed -> leading-relaxed 로 정정 */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                아이폰은 '수리 모드'가 없어 사설 수리 시 비밀번호 노출 및 사생활 침해 위험이 있습니다.<br />
                TrueFix 인증 매장은 KISA 정보보호 가이드라인을 준수하며, 고객의 비밀번호를 절대 요구하지 않습니다.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" /> 접수 전 완벽한 iCloud 영혼 백업 가이드 제공
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" /> 하드웨어 테스트 전용 체크리스트 사용 (비밀번호 불필요)
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" /> 수리 과정 르포(사진/영상) 투명 제공
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <Smartphone size={40} className="text-blue-400 mb-4" />
              <h4 className="font-bold text-lg mb-2">수리 전 필수 체크</h4>
              <p className="text-sm text-gray-400 mb-4">매장 방문 전 기기를 안전하게 초기화하는 방법을 확인하세요.</p>
              <button className="w-full bg-white text-gray-900 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition">
                백업 및 초기화 가이드 보기
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TrueFixUserPage;