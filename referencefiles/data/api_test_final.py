#!/usr/bin/env python3
"""
최종 API 테스트 - config/settings.py 사용
정확한 API 키로 전체 API 1-9번 호출 테스트
"""

import requests
import json
import logging
from datetime import datetime
from typing import Dict, Any
import time
import sys
import os

# settings 모듈 임포트
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from config.settings import get_settings

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class FinalAPITester:
    """최종 API 테스터 - 정확한 설정 사용"""
    
    def __init__(self):
        self.settings = get_settings()
        
        # 설정 검증
        validation = self.settings.validate()
        if not validation['valid']:
            logger.error("❌ 설정이 유효하지 않습니다:")
            for issue in validation['issues']:
                logger.error(f"  - {issue}")
            raise ValueError("설정 오류")
        
        logger.info("✅ 설정 로드 및 검증 완료")
        
        # API 설정 정의
        self.api_configs = {
            1: {
                'name': '정류장별 승하차',
                'url': f"{self.settings.SEOUL_API_BASE_URL}/TaimsTpssStaRouteInfoH/1.0",
                'key': self.settings.SEOUL_TRAFFIC_API_KEY,
                'params': {
                    'stdrDe': '20250801',
                    'startRow': 1,
                    'rowCnt': 10
                }
            },
            2: {
                'name': '구간별 승객수',
                'url': f"{self.settings.SEOUL_API_BASE_URL}/TaimsTpssA18RouteSection/1.0",
                'key': self.settings.SEOUL_TRAFFIC_API_KEY,
                'params': {
                    'stdrDe': '20250801',
                    'routeId': '100100001',
                    'startRow': 1,
                    'rowCnt': 10
                }
            },
            3: {
                'name': '행정동별 OD',
                'url': f"{self.settings.SEOUL_API_BASE_URL}/TaimsTpssEmdOdTc/1.0",
                'key': self.settings.SEOUL_TRAFFIC_API_KEY,
                'params': {
                    'stdrDe': '20250801',
                    'emdCd': '1111051',
                    'startRow': 1,
                    'rowCnt': 10
                }
            },
            4: {
                'name': '구간별 운행시간',
                'url': f"{self.settings.SEOUL_API_BASE_URL}/TaimsTpssRouteSectionSpeedH/1.0",
                'key': self.settings.SEOUL_TRAFFIC_API_KEY,
                'params': {
                    'stdrDe': '20250801',
                    'routeId': '100100001',
                    'startRow': 1,
                    'rowCnt': 10
                }
            },
            5: {
                'name': '노선-정류장 마스터',
                'url': f"{self.settings.SEOUL_API_BASE_URL}/TaimsTaimsTbisMsRouteNode/1.0",
                'key': self.settings.SEOUL_TRAFFIC_API_KEY,
                'params': {
                    'routeId': '100100001',
                    'startRow': 1,
                    'rowCnt': 10
                }
            },
            6: {
                'name': '좌표정보 (중단됨)',
                'status': 'discontinued'
            },
            7: {
                'name': '구간별 소통정보',
                'url': "http://t-data.seoul.go.kr/apig/apiman-gateway/tapi/TopisIccStTimesLinkTrfSectionStats/1.0",
                'key': self.settings.SEOUL_TRAFFIC_API_KEY,
                'params': {
                    'stndDt': '20250801',
                    'startRow': 1,
                    'rowCnt': 10
                }
            },
            8: {
                'name': '차량운행통계',
                'url': f"{self.settings.SEOUL_API_BASE_URL}/BisTbisStVehOprat/1.0",
                'key': self.settings.SEOUL_TRAFFIC_API_KEY,
                'params': {
                    'stdrDe': '20250801',
                    'startRow': 1,
                    'rowCnt': 10
                }
            },
            9: {
                'name': '실시간 인구',
                'url': f"{self.settings.SEOUL_POPULATION_BASE_URL}/{self.settings.SEOUL_POPULATION_API_KEY}/json/citydata_ppltn/1/5/POI007",
                'key': self.settings.SEOUL_POPULATION_API_KEY,
                'special': 'population'  # 특별 처리 필요
            }
        }
    
    def test_single_api(self, api_id: int) -> Dict[str, Any]:
        """개별 API 테스트"""
        
        if api_id not in self.api_configs:
            return {"api_id": api_id, "status": "not_defined"}
        
        config = self.api_configs[api_id]
        
        # API 6 (중단된 서비스)
        if config.get('status') == 'discontinued':
            return {
                "api_id": api_id,
                "name": config['name'],
                "status": "discontinued",
                "description": "⚠️ 서비스 중단된 API"
            }
        
        logger.info(f"🔍 API {api_id} 테스트: {config['name']}")
        logger.info(f"   URL: {config['url']}")
        
        # API 9 (인구 데이터) 특별 처리
        if config.get('special') == 'population':
            return self._test_population_api(api_id, config)
        
        # 일반 교통 API 처리
        return self._test_traffic_api(api_id, config)
    
    def _test_traffic_api(self, api_id: int, config: Dict) -> Dict[str, Any]:
        """일반 교통 API 테스트"""
        
        params = config['params'].copy()
        params['apikey'] = config['key']
        
        logger.info(f"   Parameters: {params}")
        
        for attempt in range(self.settings.API_MAX_RETRIES):
            try:
                logger.info(f"   시도 {attempt + 1}/{self.settings.API_MAX_RETRIES}")
                
                response = requests.get(
                    config['url'],
                    params=params,
                    timeout=self.settings.API_TIMEOUT,
                    verify=False
                )
                
                logger.info(f"   응답 상태: {response.status_code}")
                
                if response.status_code == 200:
                    try:
                        data = response.json()
                        record_count = len(data) if isinstance(data, list) else "N/A"
                        
                        logger.info(f"   ✅ 성공 - 레코드: {record_count}")
                        
                        return {
                            "api_id": api_id,
                            "name": config['name'],
                            "status": "success",
                            "url": config['url'],
                            "parameters": params,
                            "response_size": len(response.text),
                            "record_count": record_count,
                            "sample_data": data[:2] if isinstance(data, list) and len(data) > 0 else None,
                            "fields": list(data[0].keys()) if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict) else None
                        }
                        
                    except json.JSONDecodeError as e:
                        logger.error(f"   ❌ JSON 파싱 실패: {e}")
                        return {
                            "api_id": api_id,
                            "status": "json_error",
                            "error": str(e),
                            "response_preview": response.text[:300]
                        }
                
                elif response.status_code == 401:
                    logger.error(f"   ❌ 인증 실패 (401)")
                    return {
                        "api_id": api_id,
                        "status": "auth_error",
                        "error": "API 키 인증 실패"
                    }
                
                elif response.status_code == 410:
                    logger.error(f"   ❌ 서비스 중단 (410)")
                    return {
                        "api_id": api_id,
                        "status": "service_discontinued",
                        "error": "API 서비스 중단됨"
                    }
                
                else:
                    logger.error(f"   ❌ HTTP 오류 {response.status_code}: {response.text[:100]}")
                    
            except Exception as e:
                logger.warning(f"   ⚠️ 요청 실패: {e}")
            
            if attempt < self.settings.API_MAX_RETRIES - 1:
                time.sleep(self.settings.API_RETRY_DELAY)
        
        return {
            "api_id": api_id,
            "status": "failed_all_attempts",
            "error": f"{self.settings.API_MAX_RETRIES}번 시도 모두 실패"
        }
    
    def _test_population_api(self, api_id: int, config: Dict) -> Dict[str, Any]:
        """인구 API 특별 테스트"""
        
        logger.info(f"   인구 API 키: {config['key'][:10]}***")
        
        try:
            response = requests.get(
                config['url'],
                timeout=self.settings.API_TIMEOUT
            )
            
            logger.info(f"   응답 상태: {response.status_code}")
            logger.info(f"   Content-Type: {response.headers.get('content-type', 'N/A')}")
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '').lower()
                
                if 'json' in content_type:
                    try:
                        data = response.json()
                        logger.info(f"   ✅ JSON 응답 성공")
                        
                        return {
                            "api_id": api_id,
                            "name": config['name'],
                            "status": "success",
                            "url": config['url'],
                            "response_size": len(response.text),
                            "data_structure": self._analyze_structure(data),
                            "sample_data": self._get_sample_data(data)
                        }
                        
                    except json.JSONDecodeError:
                        logger.warning(f"   ⚠️ JSON 파싱 실패, XML로 추정")
                        
                # XML 응답 처리
                if response.text.strip().startswith('<'):
                    logger.info(f"   📄 XML 응답 감지")
                    
                    # XML에서 오류 메시지 추출
                    if 'INFO-100' in response.text:
                        return {
                            "api_id": api_id,
                            "status": "auth_error",
                            "error": "인증키 유효하지 않음",
                            "response_preview": response.text[:300]
                        }
                    elif 'INFO-000' in response.text:
                        return {
                            "api_id": api_id,
                            "name": config['name'],
                            "status": "xml_success",
                            "url": config['url'],
                            "response_size": len(response.text),
                            "response_preview": response.text[:500]
                        }
                    else:
                        return {
                            "api_id": api_id,
                            "status": "xml_unknown",
                            "response_preview": response.text[:300]
                        }
                
                # 기타 응답
                return {
                    "api_id": api_id,
                    "status": "unknown_format",
                    "response_preview": response.text[:300]
                }
                
            else:
                return {
                    "api_id": api_id,
                    "status": "http_error",
                    "status_code": response.status_code,
                    "error": response.text[:200]
                }
                
        except Exception as e:
            return {
                "api_id": api_id,
                "status": "request_error",
                "error": str(e)
            }
    
    def _analyze_structure(self, data: Any) -> Dict[str, Any]:
        """데이터 구조 분석"""
        if isinstance(data, list):
            return {
                "type": "array",
                "count": len(data),
                "sample_type": type(data[0]).__name__ if data else None
            }
        elif isinstance(data, dict):
            return {
                "type": "object",
                "keys": list(data.keys())[:10]  # 처음 10개 키만
            }
        else:
            return {"type": type(data).__name__}
    
    def _get_sample_data(self, data: Any) -> Any:
        """샘플 데이터 추출"""
        if isinstance(data, list):
            return data[:2]
        elif isinstance(data, dict):
            return {k: v for i, (k, v) in enumerate(data.items()) if i < 5}
        else:
            return str(data)[:200]
    
    def test_all_apis(self) -> Dict[str, Any]:
        """전체 API 테스트 실행"""
        logger.info("🚀 최종 API 테스트 시작")
        logger.info("=" * 60)
        logger.info(f"교통 API 키: {self.settings.SEOUL_TRAFFIC_API_KEY[:10]}***")
        logger.info(f"인구 API 키: {self.settings.SEOUL_POPULATION_API_KEY[:10]}***")
        logger.info("-" * 60)
        
        results = {}
        successful_apis = []
        failed_apis = []
        
        for api_id in range(1, 10):
            result = self.test_single_api(api_id)
            results[f"api_{api_id}"] = result
            
            if result["status"] in ["success", "xml_success"]:
                successful_apis.append(api_id)
                logger.info(f"✅ API {api_id}: 성공")
            elif result["status"] == "discontinued":
                logger.info(f"⚠️ API {api_id}: 서비스 중단")
            else:
                failed_apis.append(api_id)
                logger.error(f"❌ API {api_id}: {result.get('error', result['status'])}")
            
            time.sleep(1)  # API 호출 간격
        
        # 결과 요약
        total_testable = 8  # API 6 제외
        summary = {
            "total_apis": 9,
            "testable_apis": total_testable,
            "successful_apis": len(successful_apis),
            "failed_apis": len(failed_apis),
            "discontinued_apis": 1,
            "success_rate": f"{len(successful_apis)/total_testable*100:.1f}%",
            "successful_list": successful_apis,
            "failed_list": failed_apis,
            "timestamp": datetime.now().isoformat()
        }
        
        logger.info("📊 최종 테스트 결과:")
        logger.info(f"   ✅ 성공: {summary['successful_apis']}/{summary['testable_apis']}개 ({summary['success_rate']})")
        logger.info(f"   ❌ 실패: {summary['failed_apis']}개")
        logger.info(f"   ⚠️ 중단: {summary['discontinued_apis']}개")
        
        return {
            "summary": summary,
            "detailed_results": results
        }

def main():
    """메인 테스트 실행"""
    print("🚌 서울시 교통 API 최종 테스트")
    print("=" * 50)
    
    try:
        tester = FinalAPITester()
        test_results = tester.test_all_apis()
        
        # 결과 저장
        output_file = f"final_api_test_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(test_results, f, ensure_ascii=False, indent=2)
        
        print(f"\n📄 결과가 {output_file}에 저장되었습니다.")
        
        # 성공한 API 요약
        print("\n📋 성공한 API 요약:")
        print("-" * 40)
        
        for api_id in test_results["summary"]["successful_list"]:
            result = test_results["detailed_results"][f"api_{api_id}"]
            print(f"✅ API {api_id}: {result['name']}")
            print(f"   URL: {result['url']}")
            if 'record_count' in result:
                print(f"   레코드 수: {result['record_count']}")
            if 'fields' in result and result['fields']:
                print(f"   필드 수: {len(result['fields'])}개")
            print()
            
    except Exception as e:
        print(f"❌ 테스트 실행 중 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()