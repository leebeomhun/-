// Strict 모드 활성화
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
});

function initializeEventListeners() {
  document.getElementById('toggleCalculator').addEventListener('click', toggleElementVisibility('.bid-calculator'));
  document.getElementById('dropdownButton').addEventListener('click', toggleElementVisibility('.dropdown-menu'));
  document.getElementById('itemPrice').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      calculateBid();
    }
  });
  document.addEventListener('click', hideElementOnClickAway('.dropdown-menu'));
  document.querySelector('.dropdown-menu').addEventListener('click', (event) => event.stopPropagation());
}

function toggleElementVisibility(selector) {
  return function(event) {
    const element = document.querySelector(selector);
    element.classList.toggle('hidden');
    event?.stopPropagation();
  };
}

function hideElementOnClickAway(selector) {
  return function(event) {
    const element = document.querySelector(selector);
    if (!element.contains(event.target)) {
      element.classList.add('hidden');
    }
  };
}

async function calculateBid() {
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  const participants = parseInt(document.getElementById('participants').value);
  if (!itemPrice || !participants) {
    alert('아이템 가격과 참여인원을 입력하세요.');
    return;
  }

  const salePricePercentage = itemPrice * 0.95;
  const sharePerPerson = salePricePercentage / participants;
  const uniformDistributionPrice = salePricePercentage - sharePerPerson;
  const maxValue = uniformDistributionPrice / 1.1;

  document.getElementById('uniformDistributionPrice').textContent = uniformDistributionPrice.toFixed(0);
  document.getElementById('maxValue').textContent = maxValue.toFixed(0);
}

function showPopup(name, basicEffect, additionalEffect, elixirEffectHTML) {
    let popupContent = `<h3>${name}</h3>`;

    // basicEffect가 "정보 없음"이 아닐 경우에만 해당 내용을 추가
    if (basicEffect !== "정보 없음" && basicEffect !== undefined) {
        popupContent += `<p>기본 효과: ${basicEffect}</p>`;
    }

    // additionalEffect가 "정보 없음"이 아닐 경우에만 해당 내용을 추가
    if (additionalEffect !== "정보 없음" && additionalEffect !== undefined) {
        popupContent += `<p>추가 효과: ${additionalEffect}</p>`;
    }

    // elixirEffectHTML 내용이 존재하는 경우에만 해당 내용을 추가
    if (elixirEffectHTML && elixirEffectHTML !== "엘릭서 효과 없음" && elixirEffectHTML !== "각인 없습니다.") {
        popupContent += `<p>${elixirEffectHTML}</p>`;
    }

    document.getElementById('popupContent').innerHTML = popupContent;
    document.getElementById('popupContainer').style.display = 'block';
}

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'none';
});

function searchCharacter() {
    var characterInfoHTML = ''; // characterInfoHTML 변수 초기화
    var characterName = document.getElementById('characterName').value;
    var armoriesEndpoint = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`;
    document.getElementById('equipmentList').innerHTML = ''; // 장비 리스트 컨테이너 초기화

    fetch(armoriesEndpoint, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NTY2NDAifQ.pY2pJBU63yCBuphlcFGiJp9zteOBdbbwsKBYgyfmiKTqzHjqkhFS6wCv2t2NZtZ_IXbqaMY6QPS8ykhkU_2lizja8sB9BSjkZFiX9aZacEBTO-rgWhhfdCgXZ1yjHJwWqf3rvVd3G94oaF2AGpYBIx4HmHKKY36R1jC8gdv6-Zrz_J8MgbCjGC7P7NqEeAOeyxzkrCESSlPWr4pf6MfvZjvy6IBKfOtIC4sYw_qdpC6HvJtH6oSW12wxeR6Vh43R8atlqX-aMoNdmP2ST7coFqqdX-TIn4pHNLJ014NQXDbuqORDMAdHn638CuiiBLlGJkE0zzhXZGgeYae-2cdpTQ' // 보안 관련 주의 사항에 따라 수정
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var armoriesData = data;
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
        document.getElementById('characterInfo').innerHTML = characterInfoHTML;

        var equipmentData = data.ArmoryEquipment;
        var equipmentContainer = document.createElement('div');
        equipmentContainer.className = "equipment-container";
        
        equipmentData.forEach((equipment, i) => {
            if (i < 6) { // 처음 6개의 아이템만 처리
                let tooltipData = JSON.parse(equipment.Tooltip.replace(/\\r\\n/g, "").replace(/\\"/g, '"'));
        
                let basicEffect = tooltipData["Element_005"] ? tooltipData["Element_005"].value["Element_001"] : "정보 없음";
                let additionalEffect = tooltipData["Element_006"] ? tooltipData["Element_006"].value["Element_001"] : "정보 없음";
                let elixirEffectHTML = "엘릭서 효과 없음";
                
                if (tooltipData["Element_008"]) {
                    let elixirEffect = tooltipData["Element_008"].value["Element_000"];
                    elixirEffectHTML = `<FONT SIZE='3' COLOR='#A9D0F5'>엘릭서 효과</FONT><br>`;
                    if (elixirEffect && elixirEffect.contentStr) {
                        Object.values(elixirEffect.contentStr).forEach(effect => {
                            elixirEffectHTML += `<div><FONT color='#FFD200'>${effect.contentStr}</FONT></div>`;
                        });
                    } else {
                        elixirEffectHTML = "";
                    }
                }
        
                // 장비 아이템 DOM 요소 생성
                const equipmentItem = document.createElement('div');
                equipmentItem.className = 'equipment-item';
                equipmentItem.innerHTML = `
                    <img src="${equipment.Icon}" alt="${equipment.Name}" style="width: 30px; height: 30px;">
                    <p>${equipment.Name}</p>
                    <p>등급: ${equipment.Grade}</p>
                `;
        
                // 이벤트 리스너 추가
                equipmentItem.addEventListener('click', () => {
                    showPopup(equipment.Name, basicEffect, additionalEffect, elixirEffectHTML);
                });
        
                // 장비 아이템을 컨테이너에 추가
                equipmentContainer.appendChild(equipmentItem);
            }
        });
        
        // 장비 컨테이너를 페이지에 추가
        document.getElementById('equipmentList').appendChild(equipmentContainer);
        
        // 액세서리 정보 섹션
        var accessoryContainer = document.createElement('div');
        accessoryContainer.className = "accessory-section";
        var accessoryTitle = document.createElement('h3');
        accessoryTitle.textContent = "액세서리 정보";
        accessoryContainer.appendChild(accessoryTitle);

        var equipmentData = data.ArmoryEquipment;
        equipmentData.forEach((equipment, i) => {
            if (i >= 6 && i < 13) { // 액세서리 정보 처리
                let tooltipData = JSON.parse(equipment.Tooltip.replace(/\\r\\n/g, "").replace(/\\"/g, '"').replace(/<FONT COLOR='#FFFFAC'>/g, "<FONT COLOR='#0000FF'>").replace(/emoticon_tooltip_bracelet_locked/g, "emoticon_tooltip_bracelet_locked.png").replace(/emoticon_tooltip_bracelet_changeable/g, "emoticon_tooltip_bracelet_changeable.png"));
                let basicEffect = tooltipData["Element_004"] ? tooltipData["Element_004"].value["Element_001"] : "정보 없음";
                let additionalEffect = tooltipData["Element_005"] ? tooltipData["Element_005"].value["Element_001"] : "정보 없음";
                let elixirEffectHTML = "각인 없습니다."; // 여기에서 변수 초기화

                if (tooltipData["Element_006"]) {
                    elixirEffectHTML = "<FONT SIZE='3' COLOR='#A9D0F5'>각인 효과</FONT><br>";
                    let elixirEffects = tooltipData["Element_006"].value["Element_000"];
                    if (elixirEffects && elixirEffects.contentStr) {
                        elixirEffectHTML += Object.values(elixirEffects.contentStr).map(effect => `<div><FONT color='#FFD200'>${effect.contentStr}</FONT></div>`).join('');
                    } else {
                        elixirEffectHTML = "각인 없습니다.";
                    }
                }


                // 액세서리 아이템 DOM 요소 생성
                const accessoryItem = document.createElement('div');
                accessoryItem.className = 'equipment-acc';
                accessoryItem.innerHTML = `
                    <img src="${equipment.Icon}" alt="${equipment.Name}" style="width: 30px; height: 30px;">
                    <p>${equipment.Name}</p>
                    <p>등급: ${equipment.Grade}</p>
                `;

                // 이벤트 리스너 추가
                accessoryItem.addEventListener('click', () => {
                    showPopup(equipment.Name, basicEffect, additionalEffect, elixirEffectHTML);
                });

                // 액세서리 아이템을 컨테이너에 추가
                accessoryContainer.appendChild(accessoryItem);
            }
        });

        // 액세서리 컨테이너를 페이지에 추가
        document.getElementById('equipmentList').appendChild(accessoryContainer);
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}



    //api부분시작
    /*function searchCharacter() {
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
    */
                

    /*        // 액세서리 정보 섹션
        equipmentHTML += '<div class="accessory-section"><h3>액세서리 정보</h3>';
        for (let i = 6; i < equipmentData.length; i++) {
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
        document.getElementById('characterInfo').innerHTML = characterInfoHTML + equipmentHTML;*/