import subprocess
import time
import json
import os
from pathlib import Path

class Round1BPerformanceTester:
    def __init__(self):
        self.results = {}
        
    def get_available_pdfs(self):
        """Get list of available PDFs in test_pdfs directory"""
        test_pdfs_dir = Path("test_pdfs")
        if not test_pdfs_dir.exists():
            print("❌ test_pdfs directory not found!")
            return []
        
        pdf_files = list(test_pdfs_dir.glob("*.pdf"))
        pdf_paths = [str(pdf) for pdf in pdf_files]
        
        print(f"📁 Found {len(pdf_paths)} PDF files:")
        for pdf in pdf_paths:
            print(f"   - {pdf}")
        
        return pdf_paths
        
    def test_processing_time(self, pdfs, persona, job, output_file):
        """Test processing time for multiple PDFs"""
        start_time = time.time()
        
        cmd = [
            'python', 'main.py',
            '--pdfs'] + pdfs + [
            '--persona', persona,
            '--job', job,
            '--output', output_file
        ]
        
        print(f"🔧 Running command: {' '.join(cmd)}")
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=70)
            end_time = time.time()
            
            processing_time = end_time - start_time
            
            # Validate output exists and is valid JSON
            output_valid = False
            json_size = 0
            if os.path.exists(output_file):
                try:
                    with open(output_file, 'r', encoding='utf-8') as f:
                        json_data = json.load(f)
                        json_size = len(json.dumps(json_data))
                        # Basic schema validation
                        required_keys = ['metadata', 'extracted_sections', 'subsection_analysis']
                        output_valid = all(key in json_data for key in required_keys)
                except Exception as e:
                    print(f"   JSON validation error: {e}")
                    output_valid = False
            
            return {
                'success': result.returncode == 0,
                'processing_time': processing_time,
                'under_60s_limit': processing_time <= 60,
                'output_valid': output_valid,
                'output_size_kb': json_size / 1024,
                'stdout': result.stdout,
                'stderr': result.stderr if result.returncode != 0 else None
            }
        except subprocess.TimeoutExpired:
            return {
                'success': False,
                'processing_time': 70,
                'under_60s_limit': False,
                'error': 'TIMEOUT: Exceeded 70 seconds - CRITICAL FAILURE'
            }
    
    def run_comprehensive_tests(self):
        """Run all performance test scenarios with available PDFs"""
        
        # Get available PDFs
        available_pdfs = self.get_available_pdfs()
        
        if len(available_pdfs) < 2:
            print("❌ Need at least 2 PDF files for testing!")
            return [], False
        
        # Create test scenarios based on available PDFs
        test_scenarios = []
        
        # Scenario 1: 2 PDFs (minimum)
        if len(available_pdfs) >= 2:
            test_scenarios.append({
                'name': '2_pdfs_minimum',
                'pdfs': available_pdfs[:2],
                'persona': 'Computer Science Graduate Student',
                'job': 'Prepare for advanced OOP programming exam'
            })
        
        # Scenario 2: 3 PDFs (if available)
        if len(available_pdfs) >= 3:
            test_scenarios.append({
                'name': '3_pdfs_standard',
                'pdfs': available_pdfs[:3],
                'persona': 'PhD Research Student',
                'job': 'Conduct comprehensive literature review'
            })
        
        # Scenario 3: 4-5 PDFs (if available)
        if len(available_pdfs) >= 4:
            test_scenarios.append({
                'name': f'{min(5, len(available_pdfs))}_pdfs_maximum',
                'pdfs': available_pdfs[:min(5, len(available_pdfs))],
                'persona': 'Investment Analyst',
                'job': 'Analyze technical documentation and reports'
            })
        
        print("🎯 **ADOBE HACKATHON ROUND 1B PERFORMANCE VALIDATION**")
        print("="*60)
        
        all_passed = True
        results_summary = []
        
        for scenario in test_scenarios:
            print(f"\n📊 **Test: {scenario['name'].replace('_', ' ').title()}**")
            print(f"   PDFs: {scenario['pdfs']}")
            
            output_file = f"output/perf_test_{scenario['name']}.json"
            
            # Ensure output directory exists
            os.makedirs("output", exist_ok=True)
            
            result = self.test_processing_time(
                scenario['pdfs'],
                scenario['persona'], 
                scenario['job'],
                output_file
            )
            
            # Print results
            if result['success'] and result['under_60s_limit']:
                print(f"✅ **PASSED**: {result['processing_time']:.2f}s")
                print(f"   📄 Output: {result['output_size_kb']:.1f}KB, Valid: {result['output_valid']}")
                if result['stdout']:
                    print(f"   📝 Last output line: {result['stdout'].strip().split(chr(10))[-1]}")
            elif result['success'] and not result['under_60s_limit']:
                print(f"❌ **FAILED**: {result['processing_time']:.2f}s (OVER 60s LIMIT)")
                all_passed = False
            else:
                print(f"❌ **FAILED**: {result.get('error', 'Unknown error')}")
                if 'stderr' in result and result['stderr']:
                    print(f"   Error details: {result['stderr'][:500]}...")
                all_passed = False
            
            results_summary.append({
                'scenario': scenario['name'],
                'pdf_count': len(scenario['pdfs']),
                'time': result['processing_time'],
                'passed': result['success'] and result['under_60s_limit']
            })
        
        # Final summary
        print("\n" + "="*60)
        print("📋 **PERFORMANCE TEST SUMMARY**")
        print("="*60)
        
        for result in results_summary:
            status = "✅ PASS" if result['passed'] else "❌ FAIL"
            print(f"{result['scenario']}: {result['time']:.2f}s ({result['pdf_count']} PDFs) - {status}")
        
        if all_passed:
            print("\n🎉 **ALL TESTS PASSED - READY FOR SUBMISSION!**")
        else:
            print("\n⚠️  **SOME TESTS FAILED - NEEDS OPTIMIZATION**")
        
        return results_summary, all_passed

if __name__ == "__main__":
    tester = Round1BPerformanceTester()
    results, passed = tester.run_comprehensive_tests()
