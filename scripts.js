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
                
                    // 결과를 소수점 첫째 자리에서 반올림하여 표시
                    document.getElementById('uniformDistributionPrice').innerHTML = uniformDistributionPrice.toFixed(0);
                    document.getElementById('maxValue').innerHTML = maxValue.toFixed(0);
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

                function convertTooltipToHTML(tooltipObj) {
                    var htmlContent = '';
                    Object.keys(tooltipObj).forEach(key => {
                        var element = tooltipObj[key];
                        if (element.type === "SingleTextBox" || element.type === "ItemTitle" || element.type === "NameTagBox") {
                            // HTML 태그가 포함된 문자열을 직접 사용
                            htmlContent += element.value + '<br>';
                        } else if (element.type === "ItemPartBox" || element.type === "MultiTextBox" || element.type === "Progress" || element.type === "SetItemGroup" || element.type === "IndentStringGroup") {
                            // 복잡한 구조는 추가적인 처리가 필요할 수 있음
                            // 여기서는 단순화를 위해 value만을 사용
                            if (typeof element.value === 'object') {
                                // Element_000, Element_001 등의 키를 가진 객체 처리
                                Object.keys(element.value).forEach(subKey => {
                                    htmlContent += element.value[subKey] + '<br>';
                                });
                            } else {
                                // 단일 문자열 처리
                                htmlContent += element.value + '<br>';
                            }
                        }
                    });
                    return htmlContent;
                }

                //api부분시작
                function searchCharacter() {
                    var characterInfoHTML = ''; // characterInfoHTML 변수 초기화
                    var characterName = document.getElementById('characterName').value;
                    var armoriesEndpoint = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`;
                    var armoriesRequest = new XMLHttpRequest();
                    armoriesRequest.open("GET", armoriesEndpoint, true);
                    armoriesRequest.setRequestHeader('accept', 'application/json');
                    armoriesRequest.setRequestHeader('authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NTY2NDAifQ.pY2pJBU63yCBuphlcFGiJp9zteOBdbbwsKBYgyfmiKTqzHjqkhFS6wCv2t2NZtZ_IXbqaMY6QPS8ykhkU_2lizja8sB9BSjkZFiX9aZacEBTO-rgWhhfdCgXZ1yjHJwWqf3rvVd3G94oaF2AGpYBIx4HmHKKY36R1jC8gdv6-Zrz_J8MgbCjGC7P7NqEeAOeyxzkrCESSlPWr4pf6MfvZjvy6IBKfOtIC4sYw_qdpC6HvJtH6oSW12wxeR6Vh43R8atlqX-aMoNdmP2ST7coFqqdX-TIn4pHNLJ014NQXDbuqORDMAdHn638CuiiBLlGJkE0zzhXZGgeYae-2cdpTQ'); // 보안 관련 주의 사항에 따라 수정
                    
                    armoriesRequest.onreadystatechange = function () {
                        if (armoriesRequest.readyState === XMLHttpRequest.DONE) {
                            var status = armoriesRequest.status;
                            if (status === 0 || (status >= 200 && status < 400)) {
                                var armoriesData = JSON.parse(armoriesRequest.responseText);
                                var profile = armoriesData.ArmoryProfile;
                                characterInfoHTML += `
                                    <div class="container">
                                        <div class="left-section">
                                            <img src="${profile.CharacterImage}" alt="캐릭터 이미지">
                                        </div>
                                        <div class="right-section">
                                            <div class="basic-info-section">
                                                <p>서버 이름: ${profile.ServerName}</p>
                                                <p>캐릭터 이름: ${profile.CharacterName}</p>
                                                <p>캐릭터 레벨: ${profile.CharacterLevel}</p>
                                                <p>캐릭터 클래스: ${profile.CharacterClassName}</p>
                                                <p>아이템 평균 레벨: ${profile.ItemAvgLevel}</p>
                                                <p>최대 아이템 레벨: ${profile.ItemMaxLevel}</p>
                                                <p>원정대 레벨: ${profile.ExpeditionLevel}</p>
                                                <p>PVP 등급: ${profile.PvpGradeName}</p>
                                                <p>영지 레벨: ${profile.TownLevel}</p>
                                                <p>영지명: ${profile.TownName}</p>
                                                <p>칭호: ${profile.Title}</p>
                                                <p>길드명: ${profile.GuildName ? profile.GuildName : '없음'}</p>
                                                <p>사용 스킬 포인트: ${profile.UsingSkillPoint} / ${profile.TotalSkillPoint}</p>
                                            </div>
                                        </div>
                                        <div class="stat-section">
                                            ${profile.Stats.map(stat => `
                                                <div class="tooltip">${stat.Type}: ${stat.Value}
                                                    <span class="tooltiptext">${stat.Tooltip.join('<br>').replace(/"/g, '&quot;')}</span>
                                                </div>
                                            `).join('<br>')}
                                            ${profile.Tendencies.map(tendency => `
                                                <p>${tendency.Type}: ${tendency.Point}</p>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;
                                var equipmentData = armoriesData.ArmoryEquipment;
                                var equipmentHTML = '<div class="equipment-container">';

                                // 일반 장비 정보 섹션
                                equipmentHTML += '<div class="equipment-section"><h3>일반 장비 정보</h3>';
                                for (let i = 0; i < equipmentData.length && i < 6; i++) {
                                    let equipment = equipmentData[i];
                                    equipmentHTML += `
                                        <div class="equipment-item">
                                            <img src="${equipment.Icon}" alt="${equipment.Name}" style="width: 30px; height: 30px;">
                                            <p>${equipment.Name}</p>
                                            <p>등급: ${equipment.Grade}</p>
                                        </div>
                                    `;
                                }
                                equipmentHTML += '</div>'; // 일반 장비 정보 섹션 종료
                                
                                // 액세서리 정보 섹션
                                equipmentHTML += '<div class="accessory-section"><h3>액세서리 정보</h3>';
                                for (let i = 6; i < equipmentData.length && i < 13; i++) {
                                    let equipment = equipmentData[i];
                                    equipmentHTML += `
                                        <div class="equipment-acc">
                                            <img src="${equipment.Icon}" alt="${equipment.Name}" style="width: 30px; height: 30px;">
                                            <p>${equipment.Name}</p>
                                            <p>등급: ${equipment.Grade}</p>
                                        </div>
                                    `;
                                }
                                equipmentHTML += '</div>'; // 액세서리 정보 섹션 종료
                                
                                equipmentHTML += '</div>'; // 전체 컨테이너 종료
                
                                // 캐릭터 정보와 함께 장비 정보를 페이지에 추가
                                document.getElementById('characterInfo').innerHTML = characterInfoHTML + equipmentHTML;
                            } else {
                                console.error('ARMORIES 정보 요청 실패:', armoriesRequest.statusText);
                            }
                        }
                    };
                    armoriesRequest.send();
                }
                
                