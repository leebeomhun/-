                  // "경매입찰계산기" 버튼 클릭 이벤트 처리
                  document.getElementById('toggleCalculator').addEventListener('click', function() {
                    var calculator = document.querySelector('.bid-calculator');
                    calculator.classList.toggle('hidden'); // 'hidden' 클래스 토글
                });
                function calculateBid() {
                    const itemPrice = document.getElementById('itemPrice').value;
                    const participants = document.getElementById('participants').value;
                    
                    const salePricePercentage = itemPrice * 0.95;
                    const sharePerPerson = salePricePercentage / participants;
                    const uniformDistributionPrice = salePricePercentage - sharePerPerson;
                    const maxValue = uniformDistributionPrice / 1.1;
    
                    document.getElementById('uniformDistributionPrice').innerHTML = uniformDistributionPrice.toFixed(2);
                    document.getElementById('maxValue').innerHTML = maxValue.toFixed(2);
                }
                document.getElementById('itemPrice').addEventListener('keydown', function(event) {
                    if (event.key === "Enter") {
                        calculateBid();
                    }
                });
                calculateBid(); // 페이지 로드 시 기본 값으로 계산 실행
                // 드롭다운 버튼 클릭 이벤트 처리
                document.getElementById('dropdownButton').addEventListener('click', function(event) {
                    var dropdownMenu = document.querySelector('.dropdown-menu');
                    dropdownMenu.classList.toggle('hidden');
            
                // 이벤트 버블링을 방지하여 다른 요소들에 이벤트가 전파되지 않도록 함
                event.stopPropagation();
                });
    
                // 문서의 어느 곳이든 클릭 시 드롭다운 메뉴를 숨김
                document.addEventListener('click', function() {
                    var dropdownMenu = document.querySelector('.dropdown-menu');
                    if (!dropdownMenu.classList.contains('hidden')) {
                        dropdownMenu.classList.add('hidden');
                    }
                });
    
                // 드롭다운 메뉴가 클릭되었을 때 이벤트 버블링을 방지
                document.querySelector('.dropdown-menu').addEventListener('click', function(event) {
                    event.stopPropagation();
                });