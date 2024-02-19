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
                function searchCharacter() {
                    var characterName = document.getElementById('characterName').value;
                    var apiEndpoint = `https://developer-lostark.game.onstove.com/characters/${encodeURIComponent(characterName)}/siblings`;
                    var armoriesEndpoint = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`;
                
                    var characterRequest = new XMLHttpRequest();
                    characterRequest.open("GET", apiEndpoint, true);
                    characterRequest.setRequestHeader('accept', 'application/json');
                    characterRequest.setRequestHeader('authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NTY2NDAifQ.pY2pJBU63yCBuphlcFGiJp9zteOBdbbwsKBYgyfmiKTqzHjqkhFS6wCv2t2NZtZ_IXbqaMY6QPS8ykhkU_2lizja8sB9BSjkZFiX9aZacEBTO-rgWhhfdCgXZ1yjHJwWqf3rvVd3G94oaF2AGpYBIx4HmHKKY36R1jC8gdv6-Zrz_J8MgbCjGC7P7NqEeAOeyxzkrCESSlPWr4pf6MfvZjvy6IBKfOtIC4sYw_qdpC6HvJtH6oSW12wxeR6Vh43R8atlqX-aMoNdmP2ST7coFqqdX-TIn4pHNLJ014NQXDbuqORDMAdHn638CuiiBLlGJkE0zzhXZGgeYae-2cdpTQ');
                
                    characterRequest.onreadystatechange = function () {
                        if (characterRequest.readyState === XMLHttpRequest.DONE) {
                            var status = characterRequest.status;
                            if (status === 0 || (status >= 200 && status < 400)) {
                                var data = JSON.parse(characterRequest.responseText);
                                var characterData = data[0]; // 가정: 응답이 배열 형태이며, 첫 번째 요소를 사용
                                var characterInfoHTML = `
                                    <p>서버명: ${characterData.ServerName}</p>
                                    <p>캐릭터명: ${characterData.CharacterName}</p>
                                    <p>레벨: ${characterData.CharacterLevel}</p>
                                    <p>클래스명: ${characterData.CharacterClassName}</p>
                                    <p>평균 아이템 레벨: ${characterData.ItemAvgLevel}</p>
                                    <p>최대 아이템 레벨: ${characterData.ItemMaxLevel}</p>
                                `;
                
                                var armoriesRequest = new XMLHttpRequest();
                                armoriesRequest.open("GET", armoriesEndpoint, true);
                                armoriesRequest.setRequestHeader('accept', 'application/json');
                                armoriesRequest.setRequestHeader('authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NTY2NDAifQ.pY2pJBU63yCBuphlcFGiJp9zteOBdbbwsKBYgyfmiKTqzHjqkhFS6wCv2t2NZtZ_IXbqaMY6QPS8ykhkU_2lizja8sB9BSjkZFiX9aZacEBTO-rgWhhfdCgXZ1yjHJwWqf3rvVd3G94oaF2AGpYBIx4HmHKKY36R1jC8gdv6-Zrz_J8MgbCjGC7P7NqEeAOeyxzkrCESSlPWr4pf6MfvZjvy6IBKfOtIC4sYw_qdpC6HvJtH6oSW12wxeR6Vh43R8atlqX-aMoNdmP2ST7coFqqdX-TIn4pHNLJ014NQXDbuqORDMAdHn638CuiiBLlGJkE0zzhXZGgeYae-2cdpTQ');
                
                                armoriesRequest.onreadystatechange = function () {
                                    if (armoriesRequest.readyState === XMLHttpRequest.DONE) {
                                        var status = armoriesRequest.status;
                                        if (status === 0 || (status >= 200 && status < 400)) {
                                            var armoriesData = JSON.parse(armoriesRequest.responseText);
                                            characterInfoHTML += `
                                                <p>원정대 레벨: ${armoriesData.ArmoryProfile.ExpeditionLevel}</p>
                                                <p>PVP 등급: ${armoriesData.ArmoryProfile.PvpGradeName}</p>
                                                <p>영지 레벨: ${armoriesData.ArmoryProfile.TownLevel}</p>
                                                <p>영지명: ${armoriesData.ArmoryProfile.TownName}</p>
                                                <p>칭호: ${armoriesData.ArmoryProfile.Title}</p>
                                                <p>길드명: ${armoriesData.ArmoryProfile.GuildName ? armoriesData.ArmoryProfile.GuildName : '없음'}</p>
                                                <p>사용 스킬 포인트: ${armoriesData.ArmoryProfile.UsingSkillPoint} / ${armoriesData.ArmoryProfile.TotalSkillPoint}</p>
                                                <img src="${armoriesData.ArmoryProfile.CharacterImage}" alt="캐릭터 이미지" style="width:200px; height:auto;">    
                                            `;
                                            characterInfoHTML += `<div class="stats">`;
                                            armoriesData.ArmoryProfile.Stats.forEach(stat => {
                                                characterInfoHTML += `
                                                    <p>${stat.Type}: ${stat.Value}</p>
                                                `;
                                            });
                                            characterInfoHTML += `</div>`;

                                            characterInfoHTML += `<div class="equipment">`;
                                            armoriesData.ArmoryEquipment.forEach(equipment => {
                                                characterInfoHTML += `
                                                    <div class="equipment-item">
                                                        <img src="${equipment.Icon}" alt="${equipment.Name}" style="width: 50px; height: 50px;">
                                                        <p>${equipment.Type}: ${equipment.Name} (등급: ${equipment.Grade})</p>
                                                    </div>
                                                `;
                                            });
                                            characterInfoHTML += `</div>`;

                                            document.getElementById('characterInfo').innerHTML = characterInfoHTML;
                                        } else {
                                            console.error('ARMORIES 정보 요청 실패:', armoriesRequest.statusText);
                                        }
                                    }
                                };
                                armoriesRequest.send();
                            } else {
                                console.error('API 요청 실패:', characterRequest.statusText);
                                document.getElementById('characterInfo').innerHTML = '캐릭터 정보를 불러오는데 실패했습니다.';
                            }
                        }
                    };
                    characterRequest.send();
                }
                